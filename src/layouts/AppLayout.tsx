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

	const getLinkClassName = ({
		isActive,
	}: {
		isActive: boolean;
	}) =>
		`rounded-md px-3 py-2 text-sm font-medium no-underline transition ${
			isActive
				? 'bg-[var(--app-primary)] text-white'
				: 'text-[var(--app-color)] hover:bg-[var(--app-primary)] hover:text-white'
		}`;

	return (
		<div className="min-h-screen bg-[var(--app-background)] text-[var(--app-color)]">
			<header className="sticky top-0 z-10 border-b border-[var(--app-border)] bg-[var(--app-surface)]">
				<div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-4 text-center md:flex-row md:justify-between md:text-left">
					<div>
						<strong className="text-xl">
							World Cup Live
						</strong>

						<p className="mt-1 text-sm text-[var(--app-muted)]">
							Olá, {user}
						</p>
					</div>

					<nav className="flex flex-wrap justify-center gap-2">
						<NavLink
							to="/"
							end
							className={getLinkClassName}
						>
							Dashboard
						</NavLink>

						<NavLink
							to="/matches"
							className={getLinkClassName}
						>
							Partidas
						</NavLink>

						<NavLink
							to="/settings"
							className={getLinkClassName}
						>
							Configurações
						</NavLink>
					</nav>

					<button
						type="button"
						onClick={logout}
						className="rounded-md bg-[var(--app-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--app-primary-hover)]"
					>
						Sair
					</button>
				</div>
			</header>

			<div className="mx-auto w-full max-w-5xl px-4 py-6 md:px-6">
				<Outlet context={liveMatchesContext} />
			</div>
		</div>
	);
};

export default AppLayout;