import { useEffect, useState } from 'react';
import type {
	ConnectionStatus,
	WorldCupMatch,
} from '../types/worldCup';

type WebSocketMessage =
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

interface UseWebSocketReturn {
	status: ConnectionStatus;
	matches: WorldCupMatch[];
	lastUpdate: string | null;
}

export const useWebSocket = (): UseWebSocketReturn => {
	const [status, setStatus] =
		useState<ConnectionStatus>('connecting');
	const [matches, setMatches] = useState<WorldCupMatch[]>([]);
	const [lastUpdate, setLastUpdate] = useState<string | null>(null);

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:8080');

		socket.addEventListener('open', () => {
			setStatus('connected');
		});

		socket.addEventListener('message', event => {
			if (typeof event.data !== 'string') return;

			const message = JSON.parse(event.data) as WebSocketMessage;

			if (message.type === 'matches:update') {
				setMatches(message.matches);
				setLastUpdate(message.timestamp);
			}
		});

		socket.addEventListener('close', () => {
			setStatus('disconnected');
		});

		socket.addEventListener('error', () => {
			setStatus('error');
		});

		return () => {
			socket.close();
		};
	}, []);

	return {
		status,
		matches,
		lastUpdate,
	};
};