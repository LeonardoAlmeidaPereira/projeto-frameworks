import { describe, expect, it } from 'vitest';
import type { WorldCupMatch } from '../types/worldCup';
import {
	getMatchStatusFilter,
	isFinishedMatch,
	isLiveMatch,
} from './matchStatus';

const createMatch = (
	status: string | null,
): WorldCupMatch => ({
	idEvent: '1',
	strEvent: 'Brasil vs França',
	strLeague: 'FIFA World Cup',
	strHomeTeam: 'Brasil',
	strAwayTeam: 'França',
	intHomeScore: null,
	intAwayScore: null,
	strStatus: status,
	strProgress: null,
	dateEvent: '2026-06-22',
	strTime: '18:00:00',
});

describe('matchStatus', () => {
	it('classifica uma partida no intervalo como ao vivo', () => {
		const match = createMatch('HT');

		expect(getMatchStatusFilter(match)).toBe('live');
	});

	it('classifica uma partida finalizada', () => {
		const match = createMatch('FT');

		expect(getMatchStatusFilter(match)).toBe('finished');
	});

	it('classifica uma partida ainda não iniciada como agendada', () => {
		const match = createMatch('NS');

		expect(getMatchStatusFilter(match)).toBe('scheduled');
	});

	it('classifica um status desconhecido como other', () => {
		const match = createMatch(null);

		expect(getMatchStatusFilter(match)).toBe('other');
	});

	it('identifica corretamente partidas ao vivo e finalizadas', () => {
		const liveMatch = createMatch('2H');
		const finishedMatch = createMatch('FT');

		expect(isLiveMatch(liveMatch)).toBe(true);
		expect(isFinishedMatch(liveMatch)).toBe(false);

		expect(isLiveMatch(finishedMatch)).toBe(false);
		expect(isFinishedMatch(finishedMatch)).toBe(true);
	});
});