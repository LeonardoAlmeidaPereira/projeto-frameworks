import {
	useState,
	type FormEvent,
} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
	const [username, setUsername] = useState('');
	const [error, setError] = useState('');

	const {
		login,
		isAuthenticated,
	} = useAuth();

	const navigate = useNavigate();

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	const handleSubmit = (
		event: FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();

		const normalizedUsername = username.trim();

		if (!normalizedUsername) {
			setError('Informe seu nome para entrar.');
			return;
		}

		login(normalizedUsername);
		navigate('/');
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-[var(--app-background)] p-4 text-[var(--app-color)]">
			<section className="w-full max-w-sm rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
				<header className="mb-6 text-center">
					<h1 className="text-2xl font-bold">
						World Cup Live
					</h1>

					<p className="mt-2 text-sm text-[var(--app-muted)]">
						Acompanhe as partidas da Copa do Mundo em
						tempo real.
					</p>
				</header>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-4"
				>
					<div>
						<label
							htmlFor="username"
							className="mb-1 block text-sm font-medium"
						>
							Nome
						</label>

						<input
							id="username"
							name="username"
							type="text"
							value={username}
							onChange={event => {
								setUsername(event.target.value);
								setError('');
							}}
							placeholder="Digite seu nome"
							autoComplete="name"
							className="w-full rounded-md border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-2 outline-none focus:border-[var(--app-primary)]"
						/>
					</div>

					{error && (
						<p
							role="alert"
							className="text-sm text-red-500"
						>
							{error}
						</p>
					)}

					<button
						type="submit"
						className="w-full rounded-md bg-[var(--app-primary)] px-4 py-2 font-medium text-white transition hover:bg-[var(--app-primary-hover)]"
					>
						Entrar
					</button>
				</form>
			</section>
		</main>
	);
};

export default Login;