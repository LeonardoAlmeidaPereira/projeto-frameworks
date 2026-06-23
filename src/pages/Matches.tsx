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
		<main>
			<header>
				<h1>Partidas</h1>

				<p>
					Consulte e filtre as partidas recebidas em
					tempo real.
				</p>
			</header>

			<section>
				<div>
					<label htmlFor="match-search">
						Buscar seleção
					</label>

					<input
						id="match-search"
						type="search"
						value={searchTerm}
						onChange={handleSearchChange}
						placeholder="Ex.: França"
					/>
				</div>

				<div>
					<label htmlFor="status-filter">
						Status
					</label>

					<select
						id="status-filter"
						value={statusFilter}
						onChange={handleStatusChange}
					>
						<option value="all">
							Todas
						</option>

						<option value="live">
							Em andamento
						</option>

						<option value="finished">
							Finalizadas
						</option>

						<option value="scheduled">
							Agendadas
						</option>
					</select>
				</div>
			</section>

			<section>
				<h2>Resultados</h2>

				<p>
					{filteredMatches.length}{' '}
					{filteredMatches.length === 1
						? 'partida encontrada'
						: 'partidas encontradas'}
				</p>

				{currentMatches.length ? (
					<div>
						{currentMatches.map(match => (
							<MatchCard
								key={match.idEvent}
								match={match}
							/>
						))}
					</div>
				) : (
					<p>
						Nenhuma partida corresponde aos filtros
						selecionados.
					</p>
				)}
			</section>

			{filteredMatches.length > MATCHES_PER_PAGE && (
				<nav aria-label="Paginação das partidas">
					<button
						type="button"
						disabled={currentPage === 1}
						onClick={() =>
							setSelectedPage(currentPage - 1)
						}
					>
						Anterior
					</button>

					<span>
						Página {currentPage} de {totalPages}
					</span>

					<button
						type="button"
						disabled={currentPage === totalPages}
						onClick={() =>
							setSelectedPage(currentPage + 1)
						}
					>
						Próxima
					</button>
				</nav>
			)}
		</main>
	);
};

export default Matches;