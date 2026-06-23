import { Link, useParams } from 'react-router-dom';
import { WebSocketStatus } from '../components/WebSocketStatus';
import { useLiveMatches } from '../hooks/useLiveMatches';

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
			<main>
				<h1>Partida não encontrada</h1>

				<p>
					A partida pode ainda não ter sido recebida pelo
					WebSocket ou não pertence aos jogos do dia.
				</p>

				<Link to="/matches">
					Voltar para partidas
				</Link>
			</main>
		);
	}

	return (
		<main>
			<header>
				<Link to="/matches">
					Voltar para partidas
				</Link>

				<h1>{match.strEvent}</h1>

				<WebSocketStatus
					status={status}
					lastUpdate={lastUpdate}
				/>
			</header>

			<section>
				<p>{match.strLeague}</p>

				<div>
					<div>
						<h2>{match.strHomeTeam}</h2>

						<strong>
							{match.intHomeScore ?? '-'}
						</strong>
					</div>

					<span>x</span>

					<div>
						<h2>{match.strAwayTeam}</h2>

						<strong>
							{match.intAwayScore ?? '-'}
						</strong>
					</div>
				</div>
			</section>

			<section>
				<h2>Informações da partida</h2>

				<dl>
					<div>
						<dt>Status</dt>
						<dd>
							{match.strStatus ??
								'Não informado'}
						</dd>
					</div>

					<div>
						<dt>Progresso</dt>
						<dd>
							{match.strProgress ??
								'Não informado'}
						</dd>
					</div>

					<div>
						<dt>Data</dt>
						<dd>{match.dateEvent}</dd>
					</div>

					<div>
						<dt>Horário</dt>
						<dd>
							{match.strTime ??
								'Não informado'}
						</dd>
					</div>

					<div>
						<dt>ID do evento</dt>
						<dd>{match.idEvent}</dd>
					</div>
				</dl>
			</section>
		</main>
	);
};

export default MatchDetails;