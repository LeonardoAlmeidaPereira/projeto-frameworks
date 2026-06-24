import {
	type ChangeEvent,
	useMemo,
	useState,
} from 'react';
import { MatchCard } from '../components/MatchCard';
import {
	getMatchStatusFilter,
	type MatchStatusFilter,
} from '../helpers/matchStatus';
import { useLiveMatches } from '../hooks/useLiveMatches';

const MATCHES_PER_PAGE = 2;

const Matches = () => {
	const { matches } = useLiveMatches();

	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] =
		useState<MatchStatusFilter>('all');
	const [selectedPage, setSelectedPage] = useState(1);

	const filteredMatches = useMemo(() => {
		const normalizedSearchTerm = searchTerm
			.trim()
			.toLocaleLowerCase('pt-BR');

		return matches.filter(match => {
			const matchesSearch =
				!normalizedSearchTerm ||
				match.strHomeTeam
					.toLocaleLowerCase('pt-BR')
					.includes(normalizedSearchTerm) ||
				match.strAwayTeam
					.toLocaleLowerCase('pt-BR')
					.includes(normalizedSearchTerm) ||
				match.strEvent
					.toLocaleLowerCase('pt-BR')
					.includes(normalizedSearchTerm);

			const matchesStatus =
				statusFilter === 'all' ||
				getMatchStatusFilter(match) === statusFilter;

			return matchesSearch && matchesStatus;
		});
	}, [matches, searchTerm, statusFilter]);

	const totalPages = Math.max(
		1,
		Math.ceil(filteredMatches.length / MATCHES_PER_PAGE),
	);

	const currentPage = Math.min(selectedPage, totalPages);

	const currentMatches = filteredMatches.slice(
		(currentPage - 1) * MATCHES_PER_PAGE,
		currentPage * MATCHES_PER_PAGE,
	);

	const handleSearchChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => {
		setSearchTerm(event.target.value);
		setSelectedPage(1);
	};

	const handleStatusChange = (
		event: ChangeEvent<HTMLSelectElement>,
	) => {
		setStatusFilter(event.target.value as MatchStatusFilter);
		setSelectedPage(1);
	};

	return (
		<main className="flex flex-col gap-8">
			<header>
				<h1 className="text-2xl font-bold md:text-3xl">
					Partidas
				</h1>

				<p className="mt-2 text-sm text-[var(--app-muted)] md:text-base">
					Consulte e filtre as partidas recebidas em tempo
					real.
				</p>
			</header>

			<section className="grid gap-4 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-4 md:grid-cols-2 md:p-6">
				<div>
					<label
						htmlFor="match-search"
						className="mb-1 block text-sm font-medium"
					>
						Buscar seleção
					</label>

					<input
						id="match-search"
						type="search"
						value={searchTerm}
						onChange={handleSearchChange}
						placeholder="Ex.: França"
						className="w-full rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-2 text-[var(--app-color)] outline-none focus:border-[var(--app-primary)]"
					/>
				</div>

				<div>
					<label
						htmlFor="status-filter"
						className="mb-1 block text-sm font-medium"
					>
						Status
					</label>

					<select
						id="status-filter"
						value={statusFilter}
						onChange={handleStatusChange}
						className="w-full rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-2 text-[var(--app-color)] outline-none focus:border-[var(--app-primary)]"
					>
						<option value="all">Todas</option>
						<option value="live">Em andamento</option>
						<option value="finished">Finalizadas</option>
						<option value="scheduled">Agendadas</option>
					</select>
				</div>
			</section>

			<section>
				<div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
					<h2 className="text-xl font-semibold">
						Resultados
					</h2>

					<p className="text-sm text-[var(--app-muted)]">
						{filteredMatches.length}{' '}
						{filteredMatches.length === 1
							? 'partida encontrada'
							: 'partidas encontradas'}
					</p>
				</div>

				{currentMatches.length ? (
					<div className="flex flex-col items-center gap-4">
						{currentMatches.map(match => (
							<MatchCard
								key={match.idEvent}
								match={match}
							/>
						))}
					</div>
				) : (
					<p className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-6 text-center text-[var(--app-muted)]">
						Nenhuma partida corresponde aos filtros
						selecionados.
					</p>
				)}
			</section>

			{filteredMatches.length > MATCHES_PER_PAGE && (
				<nav
					aria-label="Paginação das partidas"
					className="flex flex-wrap items-center justify-center gap-4"
				>
					<button
						type="button"
						disabled={currentPage === 1}
						onClick={() =>
							setSelectedPage(currentPage - 1)
						}
						className="rounded-lg bg-[var(--app-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--app-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
					>
						Anterior
					</button>

					<span className="text-sm">
						Página {currentPage} de {totalPages}
					</span>

					<button
						type="button"
						disabled={currentPage === totalPages}
						onClick={() =>
							setSelectedPage(currentPage + 1)
						}
						className="rounded-lg bg-[var(--app-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--app-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
					>
						Próxima
					</button>
				</nav>
			)}
		</main>
	);
};

export default Matches;