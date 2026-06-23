import type { ConnectionStatus } from '../types/worldCup';

interface WebSocketStatusProps {
	status: ConnectionStatus;
	lastUpdate: string | null;
}

const statusLabels: Record<ConnectionStatus, string> = {
	connecting: 'Conectando...',
	connected: 'Conectado',
	disconnected: 'Desconectado',
	error: 'Erro na conexão',
};

export const WebSocketStatus = ({
	status,
	lastUpdate,
}: WebSocketStatusProps) => {
	return (
		<div>
			<p>Status da conexão: {statusLabels[status]}</p>

			{lastUpdate && (
				<p>
					Última atualização:{' '}
					<time dateTime={lastUpdate}>
						{new Date(lastUpdate).toLocaleTimeString('pt-BR')}
					</time>
				</p>
			)}
		</div>
	);
};