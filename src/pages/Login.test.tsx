import {
	render,
	screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
	MemoryRouter,
	Route,
	Routes,
} from 'react-router-dom';
import {
	beforeEach,
	describe,
	expect,
	it,
} from 'vitest';
import { AuthProvider } from '../contexts/AuthProvider';
import Login from './Login';

const renderLogin = () => {
	render(
		<AuthProvider>
			<MemoryRouter initialEntries={['/login']}>
				<Routes>
					<Route
						path="/login"
						element={<Login />}
					/>

					<Route
						path="/"
						element={
							<h1>Dashboard de teste</h1>
						}
					/>
				</Routes>
			</MemoryRouter>
		</AuthProvider>,
	);
};

describe('Login', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('exibe o formulário de autenticação', () => {
		renderLogin();

		expect(
			screen.getByRole('heading', {
				name: 'World Cup Live',
			}),
		).toBeInTheDocument();

		expect(
			screen.getByLabelText('Nome'),
		).toBeInTheDocument();

		expect(
			screen.getByRole('button', {
				name: 'Entrar',
			}),
		).toBeInTheDocument();
	});

	it('exibe uma mensagem de erro quando o nome não é informado', async () => {
		const user = userEvent.setup();

		renderLogin();

		await user.click(
			screen.getByRole('button', {
				name: 'Entrar',
			}),
		);

		expect(
			screen.getByRole('alert'),
		).toHaveTextContent(
			'Informe seu nome para entrar.',
		);

		expect(
			screen.queryByRole('heading', {
				name: 'Dashboard de teste',
			}),
		).not.toBeInTheDocument();
	});

	it('autentica, salva o usuário e redireciona para o Dashboard', async () => {
		const user = userEvent.setup();

		renderLogin();

		await user.type(
			screen.getByLabelText('Nome'),
			'  Leonardo  ',
		);

		await user.click(
			screen.getByRole('button', {
				name: 'Entrar',
			}),
		);

		expect(
			screen.getByRole('heading', {
				name: 'Dashboard de teste',
			}),
		).toBeInTheDocument();

		expect(
			localStorage.getItem('world-cup-user'),
		).toBe('Leonardo');
	});
});