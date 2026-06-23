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
		<main>
			<section>
				<h1>World Cup Live</h1>

				<p>
					Acompanhe as partidas da Copa do Mundo em
					tempo real.
				</p>

				<form onSubmit={handleSubmit}>
					<label htmlFor="username">
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
					/>

					{error && (
						<p role="alert">
							{error}
						</p>
					)}

					<button type="submit">
						Entrar
					</button>
				</form>
			</section>
		</main>
	);
};

export default Login;