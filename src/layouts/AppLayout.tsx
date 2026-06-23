import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useWebSocket } from '../hooks/useWebSocket';
import type { LiveMatchesContext } from '../types/worldCup';

const AppLayout = () => {
	const { user, logout } = useAuth();
	const { status, matches, lastUpdate } = useWebSocket();

	const liveMatchesContext = {
		status,
		matches,
		lastUpdate,
	} satisfies LiveMatchesContext;

	return (
		<>
			<header>
				<div>
					<strong>World Cup Live</strong>
					<p>Olá, {user}</p>
				</div>

				<nav>
                    <NavLink to="/" end>
                        Dashboard
                    </NavLink>

                    <NavLink to="/matches">
                        Partidas
                    </NavLink>

                    <NavLink to="/settings">
                        Configurações
                    </NavLink>
                </nav>

				<button
					type="button"
					onClick={logout}
				>
					Sair
				</button>
			</header>

			<Outlet context={liveMatchesContext} />
		</>
	);
};

export default AppLayout;