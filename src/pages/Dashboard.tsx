import { MatchCard } from '../components/MatchCard';
import { WebSocketStatus } from '../components/WebSocketStatus';
import { useLiveMatches } from '../hooks/useLiveMatches';
import {
	isFinishedMatch,
	isLiveMatch,
} from '../helpers/matchStatus';

const Dashboard = () => {
	const {
		status,
		matches,
		lastUpdate,
	} = useLiveMatches();

	const liveMatches = matches.filter(isLiveMatch);
	const finishedMatches = matches.filter(isFinishedMatch);

	return (
		<main>
			<header>
				<h1>Copa do Mundo em tempo real</h1>

				<WebSocketStatus
					status={status}
					lastUpdate={lastUpdate}
				/>
			</header>

			<section>
				<h2>Resumo do dia</h2>

				<p>Total de partidas: {matches.length}</p>

				<p>
					Partidas em andamento: {liveMatches.length}
				</p>

				<p>
					Partidas finalizadas: {finishedMatches.length}
				</p>
			</section>

			<section>
				<h2>Partidas de hoje</h2>

				{matches.length ? (
					<div>
						{matches.map(match => (
							<MatchCard
								key={match.idEvent}
								match={match}
							/>
						))}
					</div>
				) : (
					<p>
						Nenhuma partida encontrada para hoje.
					</p>
				)}
			</section>
		</main>
	);
};

export default Dashboard;