import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type { WorldCupMatch } from '../types/worldCup';
import { MatchCard } from './MatchCard';

const match: WorldCupMatch = {
	idEvent: '123',
	strEvent: 'Brasil vs França',
	strLeague: 'FIFA World Cup',
	strHomeTeam: 'Brasil',
	strAwayTeam: 'França',
	intHomeScore: '2',
	intAwayScore: '1',
	strStatus: 'FT',
	strProgress: null,
	dateEvent: '2026-06-22',
	strTime: '18:00:00',
};

const renderMatchCard = (currentMatch: WorldCupMatch) => {
	render(
		<MemoryRouter>
			<MatchCard match={currentMatch} />
		</MemoryRouter>,
	);
};

describe('MatchCard', () => {
	it('exibe as seleções, o placar e o status da partida', () => {
		renderMatchCard(match);

		expect(
			screen.getByText('Brasil x França'),
		).toBeInTheDocument();

		expect(
			screen.getByText('2 x 1'),
		).toBeInTheDocument();

		expect(
			screen.getByText('FT'),
		).toBeInTheDocument();
	});

	it('cria um link para a página de detalhes da partida', () => {
		renderMatchCard(match);

		const detailsLink = screen.getByRole('link', {
			name: 'Ver detalhes',
		});

		expect(detailsLink).toHaveAttribute(
			'href',
			'/matches/123',
		);
	});

	it('exibe valores alternativos quando o placar e o status não existem', () => {
		renderMatchCard({
			...match,
			intHomeScore: null,
			intAwayScore: null,
			strStatus: null,
		});

		expect(
			screen.getByText('Status não informado'),
		).toBeInTheDocument();

		expect(
			screen.getByText('- x -'),
		).toBeInTheDocument();
	});
});