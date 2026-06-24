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

const statusColors: Record<ConnectionStatus, string> = {
	connecting: 'bg-amber-500',
	connected: 'bg-emerald-500',
	disconnected: 'bg-gray-500',
	error: 'bg-red-500',
};

export const WebSocketStatus = ({
	status,
	lastUpdate,
}: WebSocketStatusProps) => {
	return (
		<div className="flex flex-col gap-1 text-sm text-[var(--app-muted)]">
			<p className="flex items-center gap-2">
				<span
					className={`h-2.5 w-2.5 rounded-full ${statusColors[status]}`}
				/>

				Status da conexão: {statusLabels[status]}
			</p>

			{lastUpdate && (
				<p>
					Última atualização:{' '}
					<time dateTime={lastUpdate}>
						{new Date(lastUpdate).toLocaleTimeString(
							'pt-BR',
						)}
					</time>
				</p>
			)}
		</div>
	);
};