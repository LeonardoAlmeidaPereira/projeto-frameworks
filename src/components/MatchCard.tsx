import { Link } from 'react-router-dom';
import type { WorldCupMatch } from '../types/worldCup';
import { getMatchStatusLabel } from '../helpers/matchStatus';

interface MatchCardProps {
	match: WorldCupMatch;
}

const formatDate = (date: string) =>
	date.split('-').reverse().join('/');

const formatTime = (time: string | null) =>
	time ? time.slice(0, 5) : 'Horário não informado';

export const MatchCard = ({ match }: MatchCardProps) => {
	return (
		<article className="w-full max-w-xl rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-4 text-center">
			<div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-sm text-[var(--app-muted)]">
				<time dateTime={`${match.dateEvent}T${match.strTime ?? ''}`}>
					{formatDate(match.dateEvent)} às{' '}
					{formatTime(match.strTime)}
				</time>

				<span>•</span>

				<span>
					{getMatchStatusLabel(match.strStatus)}
				</span>
			</div>

			<span className="sr-only">
				{match.strHomeTeam} x {match.strAwayTeam}
			</span>

			<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
				<h2 className="text-base font-semibold md:text-lg">
					{match.strHomeTeam}
				</h2>

				<strong className="min-w-20 rounded-md bg-[var(--app-surface-secondary)] px-3 py-2 text-lg md:text-xl">
					{match.intHomeScore ?? '-'} x{' '}
					{match.intAwayScore ?? '-'}
				</strong>

				<h2 className="text-base font-semibold md:text-lg">
					{match.strAwayTeam}
				</h2>
			</div>

			<Link
				to={`/matches/${match.idEvent}`}
				className="mt-4 inline-block text-sm font-medium text-[var(--app-primary)] no-underline hover:underline"
			>
				Ver mais detalhes
			</Link>
		</article>
	);
};