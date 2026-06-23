import { WebSocket, WebSocketServer } from 'ws';

const PORT = 8080;
const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/123';
const WORLD_CUP_LEAGUE_ID = '4429';
const API_POLLING_INTERVAL = 30_000;
const HEARTBEAT_INTERVAL = 5_000;

interface WorldCupMatch {
	idEvent: string;
	strEvent: string;
	strLeague: string;
	strHomeTeam: string;
	strAwayTeam: string;
	intHomeScore: string | null;
	intAwayScore: string | null;
	strStatus: string | null;
	strProgress: string | null;
	dateEvent: string;
	strTime: string | null;
}

interface SportsDbEventsResponse {
	events: WorldCupMatch[] | null;
}

type ServerMessage =
	| {
			type: 'connection' | 'heartbeat';
			message: string;
			timestamp: string;
	  }
	| {
			type: 'matches:update';
			matches: WorldCupMatch[];
			timestamp: string;
	  };

const webSocketServer = new WebSocketServer({
	port: PORT,
});

let latestMatches: WorldCupMatch[] = [];

const getCurrentDate = () =>
	new Intl.DateTimeFormat('en-CA', {
		timeZone: 'America/Sao_Paulo',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(new Date());

const getWorldCupMatches = async (): Promise<WorldCupMatch[]> => {
	const currentDate = getCurrentDate();

	const response = await fetch(
		`${API_BASE_URL}/eventsday.php?d=${currentDate}&l=${WORLD_CUP_LEAGUE_ID}`,
	);

	if (!response.ok) {
		throw new Error(
			`Erro ao consultar TheSportsDB: ${response.status} ${response.statusText}`,
		);
	}

	const data = (await response.json()) as SportsDbEventsResponse;

	return data.events ?? [];
};

const sendMessage = (socket: WebSocket, data: ServerMessage) => {
	if (socket.readyState !== WebSocket.OPEN) return;

	socket.send(JSON.stringify(data));
};

const broadcastMessage = (data: ServerMessage) => {
	webSocketServer.clients.forEach(client => {
		sendMessage(client, data);
	});
};

const checkWorldCupMatches = async () => {
	try {
		const matches = await getWorldCupMatches();

		latestMatches = matches;

		console.log(
			`Consulta realizada em ${new Date().toLocaleTimeString('pt-BR')}`,
		);

		if (!matches.length) {
			console.log('Nenhuma partida da Copa foi encontrada para hoje');
		} else {
			console.table(
				matches.map(match => ({
					id: match.idEvent,
					partida: match.strEvent,
					placar: `${match.intHomeScore ?? '-'} x ${
						match.intAwayScore ?? '-'
					}`,
					status: match.strStatus ?? '-',
					progresso: match.strProgress ?? '-',
					horario: match.strTime ?? '-',
				})),
			);
		}

		broadcastMessage({
			type: 'matches:update',
			matches,
			timestamp: new Date().toISOString(),
		});

		console.log(
			`Partidas enviadas para ${webSocketServer.clients.size} cliente(s)`,
		);
	} catch (error) {
		console.error(
			'Erro ao buscar partidas:',
			error instanceof Error ? error.message : error,
		);
	}
};

webSocketServer.on('connection', socket => {
	console.log('Cliente conectado');

	sendMessage(socket, {
		type: 'connection',
		message: 'Conexão com o servidor WebSocket estabelecida',
		timestamp: new Date().toISOString(),
	});

	if (latestMatches.length) {
		sendMessage(socket, {
			type: 'matches:update',
			matches: latestMatches,
			timestamp: new Date().toISOString(),
		});
	}

	socket.on('close', () => {
		console.log('Cliente desconectado');
	});

	socket.on('error', error => {
		console.error('Erro na conexão WebSocket:', error);
	});
});

const heartbeatInterval = setInterval(() => {
	broadcastMessage({
		type: 'heartbeat',
		message: 'Conexão ativa',
		timestamp: new Date().toISOString(),
	});
}, HEARTBEAT_INTERVAL);

const apiPollingInterval = setInterval(() => {
	void checkWorldCupMatches();
}, API_POLLING_INTERVAL);

webSocketServer.on('close', () => {
	clearInterval(heartbeatInterval);
	clearInterval(apiPollingInterval);
});

void checkWorldCupMatches();

console.log(`Servidor WebSocket executando em ws://localhost:${PORT}`);