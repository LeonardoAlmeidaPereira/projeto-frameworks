import type { WorldCupMatch } from '../types/worldCup';

export type MatchStatusFilter =
	| 'all'
	| 'live'
	| 'finished'
	| 'scheduled';

const LIVE_STATUSES = new Set([
	'1H',
	'HT',
	'2H',
	'ET',
	'P',
	'LIVE',
	'IN PLAY',
]);

const FINISHED_STATUSES = new Set([
	'FT',
	'AET',
	'PEN',
	'MATCH FINISHED',
]);

const SCHEDULED_STATUSES = new Set([
	'NS',
	'TBD',
	'SCHEDULED',
	'NOT STARTED',
]);

const normalizeStatus = (status: string | null) =>
	status?.trim().toUpperCase() ?? '';

export const getMatchStatusFilter = (
	match: WorldCupMatch,
): Exclude<MatchStatusFilter, 'all'> | 'other' => {
	const status = normalizeStatus(match.strStatus);

	if (LIVE_STATUSES.has(status)) {
		return 'live';
	}

	if (FINISHED_STATUSES.has(status)) {
		return 'finished';
	}

	if (SCHEDULED_STATUSES.has(status)) {
		return 'scheduled';
	}

	return 'other';
};

export const isLiveMatch = (match: WorldCupMatch) =>
	getMatchStatusFilter(match) === 'live';

export const isFinishedMatch = (match: WorldCupMatch) =>
	getMatchStatusFilter(match) === 'finished';