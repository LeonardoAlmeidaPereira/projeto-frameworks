import { Link } from 'react-router-dom';
import type { WorldCupMatch } from '../types/worldCup';

interface MatchCardProps {
	match: WorldCupMatch;
}

export const MatchCard = ({ match }: MatchCardProps) => {
	return (
		<article>
			<p>{match.strStatus ?? 'Status não informado'}</p>

			<h2>
				{match.strHomeTeam} x {match.strAwayTeam}
			</h2>

			<strong>
				{match.intHomeScore ?? '-'} x{' '}
				{match.intAwayScore ?? '-'}
			</strong>

			<p>
				{match.dateEvent}

				{match.strTime && ` às ${match.strTime}`}
			</p>

			{match.strProgress && (
				<p>Progresso: {match.strProgress}</p>
			)}

			<Link to={`/matches/${match.idEvent}`}>
				Ver detalhes
			</Link>
		</article>
	);
};