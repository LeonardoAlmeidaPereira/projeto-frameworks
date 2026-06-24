import { MatchCard } from '../components/MatchCard';
import { WebSocketStatus } from '../components/WebSocketStatus';
import {
	isFinishedMatch,
	isLiveMatch,
} from '../helpers/matchStatus';
import { useLiveMatches } from '../hooks/useLiveMatches';

const Dashboard = () => {
	const {
		status,
		matches,
		lastUpdate,
	} = useLiveMatches();

	const liveMatches = matches.filter(isLiveMatch);
	const finishedMatches = matches.filter(isFinishedMatch);

	return (
		<main className="flex flex-col gap-6">
			<header>
				<h1 className="text-2xl font-bold md:text-3xl">
					Copa do Mundo em tempo real
				</h1>

				<div className="mt-3">
					<WebSocketStatus
						status={status}
						lastUpdate={lastUpdate}
					/>
				</div>
			</header>

			<section>
				<h2 className="mb-3 text-xl font-semibold">
					Resumo do dia
				</h2>

				<div className="grid gap-3 sm:grid-cols-3">
					<div className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-4 text-center">
						<strong className="block text-2xl">
							{matches.length}
						</strong>

						<span className="text-sm text-[var(--app-muted)]">
							Total de partidas
						</span>
					</div>

					<div className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-4 text-center">
						<strong className="block text-2xl">
							{liveMatches.length}
						</strong>

						<span className="text-sm text-[var(--app-muted)]">
							Em andamento
						</span>
					</div>

					<div className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-4 text-center">
						<strong className="block text-2xl">
							{finishedMatches.length}
						</strong>

						<span className="text-sm text-[var(--app-muted)]">
							Finalizadas
						</span>
					</div>
				</div>
			</section>

			<section>
				<h2 className="mb-4 text-xl font-semibold">
					Partidas de hoje
				</h2>

				{matches.length ? (
					<div className="flex flex-col items-center gap-4">
						{matches.map(match => (
							<MatchCard
								key={match.idEvent}
								match={match}
							/>
						))}
					</div>
				) : (
					<p className="text-[var(--app-muted)]">
						Nenhuma partida encontrada para hoje.
					</p>
				)}
			</section>
		</main>
	);
};

export default Dashboard;