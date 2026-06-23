export type ConnectionStatus =
	| 'connecting'
	| 'connected'
	| 'disconnected'
	| 'error';

export interface WorldCupMatch {
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

export interface LiveMatchesContext {
	status: ConnectionStatus;
	matches: WorldCupMatch[];
	lastUpdate: string | null;
}