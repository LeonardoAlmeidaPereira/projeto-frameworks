import { Link, useParams } from 'react-router-dom';
import { WebSocketStatus } from '../components/WebSocketStatus';
import { useLiveMatches } from '../hooks/useLiveMatches';
import { getMatchStatusLabel } from '../helpers/matchStatus';

const formatDate = (date: string) =>
	date.split('-').reverse().join('/');

const formatTime = (time: string | null) =>
	time ? time.slice(0, 5) : 'Horário não informado';

const MatchDetails = () => {
	const { id } = useParams<{ id: string }>();

	const {
		status,
		matches,
		lastUpdate,
	} = useLiveMatches();

	const match = matches.find(
		currentMatch => currentMatch.idEvent === id,
	);

	if (!match) {
		return (
			<main className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 text-center">
				<section className="w-full rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
					<h1 className="text-2xl font-bold">
						Partida não encontrada
					</h1>

					<p className="mt-3 text-[var(--app-muted)]">
						A partida pode ainda não ter sido recebida
						pelo WebSocket ou não pertence aos jogos do
						dia.
					</p>

					<Link
						to="/matches"
						className="mt-5 inline-block rounded-lg bg-[var(--app-primary)] px-4 py-2 font-medium text-white no-underline transition hover:bg-[var(--app-primary-hover)]"
					>
						Voltar para partidas
					</Link>
				</section>
			</main>
		);
	}

	return (
		<main className="mx-auto flex w-full max-w-3xl flex-col gap-6">
			<header>
				<Link
					to="/matches"
					className="inline-flex items-center text-sm font-medium text-[var(--app-primary)] no-underline hover:underline"
				>
					← Voltar para partidas
				</Link>

				<h1 className="mt-4 text-2xl font-bold md:text-3xl">
					Detalhes da partida
				</h1>

				<div className="mt-3">
					<WebSocketStatus
						status={status}
						lastUpdate={lastUpdate}
					/>
				</div>
			</header>

			<section className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-4 text-center md:p-6">
				<div className="mb-5 text-sm text-[var(--app-muted)]">
					<p>{match.strLeague}</p>

					<time
						dateTime={`${match.dateEvent}T${match.strTime ?? ''}`}
					>
						{formatDate(match.dateEvent)} às{' '}
						{formatTime(match.strTime)}
					</time>
				</div>

				<div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
					<div className="min-w-0">
						<h2 className="break-words text-base font-semibold md:text-xl">
							{match.strHomeTeam}
						</h2>
					</div>

					<div className="rounded-lg bg-[var(--app-surface-secondary)] px-4 py-3">
						<strong className="whitespace-nowrap text-xl md:text-2xl">
							{match.intHomeScore ?? '-'} x{' '}
							{match.intAwayScore ?? '-'}
						</strong>
					</div>

					<div className="min-w-0">
						<h2 className="break-words text-base font-semibold md:text-xl">
							{match.strAwayTeam}
						</h2>
					</div>
				</div>

				<p className="mt-5 inline-block rounded-full border border-[var(--app-border)] px-3 py-1 text-sm">
					{getMatchStatusLabel(match.strStatus)}
				</p>
			</section>

			<section className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-4 md:p-6">
				<h2 className="mb-5 text-xl font-semibold">
					Informações da partida
				</h2>

				<dl className="grid gap-4 sm:grid-cols-2">
					<div className="rounded-lg bg-[var(--app-surface-secondary)] p-4">
						<dt className="text-sm text-[var(--app-muted)]">
							Status
						</dt>

						<dd className="mt-1 font-medium">
							{getMatchStatusLabel(match.strStatus)}
						</dd>
					</div>

					<div className="rounded-lg bg-[var(--app-surface-secondary)] p-4">
						<dt className="text-sm text-[var(--app-muted)]">
							Progresso
						</dt>

						<dd className="mt-1 font-medium">
							{match.strProgress ?? 'Não informado'}
						</dd>
					</div>

					<div className="rounded-lg bg-[var(--app-surface-secondary)] p-4">
						<dt className="text-sm text-[var(--app-muted)]">
							Data
						</dt>

						<dd className="mt-1 font-medium">
							{formatDate(match.dateEvent)}
						</dd>
					</div>

					<div className="rounded-lg bg-[var(--app-surface-secondary)] p-4">
						<dt className="text-sm text-[var(--app-muted)]">
							Horário
						</dt>

						<dd className="mt-1 font-medium">
							{formatTime(match.strTime)}
						</dd>
					</div>

					<div className="rounded-lg bg-[var(--app-surface-secondary)] p-4 sm:col-span-2">
						<dt className="text-sm text-[var(--app-muted)]">
							ID do evento
						</dt>

						<dd className="mt-1 font-medium">
							{match.idEvent}
						</dd>
					</div>
				</dl>
			</section>
		</main>
	);
};

export default MatchDetails;