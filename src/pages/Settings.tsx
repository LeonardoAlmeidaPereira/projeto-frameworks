import {
	type ChangeEvent,
} from 'react';
import type { Theme } from '../contexts/settingsContext';
import { useSettings } from '../hooks/useSettings';

const Settings = () => {
	const {
		theme,
		setTheme,
		resetTheme,
	} = useSettings();

	const handleThemeChange = (
		event: ChangeEvent<HTMLSelectElement>,
	) => {
		setTheme(event.target.value as Theme);
	};

	return (
		<main className="mx-auto flex w-full max-w-xl flex-col gap-6">
			<header>
				<h1 className="text-2xl font-bold md:text-3xl">
					Configurações
				</h1>

				<p className="mt-2 text-[var(--app-muted)]">
					Personalize a aparência da aplicação.
				</p>
			</header>

			<section className="rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-4 md:p-6">
				<label
					htmlFor="theme"
					className="mb-1 block text-sm font-medium"
				>
					Tema
				</label>

				<select
					id="theme"
					name="theme"
					value={theme}
					onChange={handleThemeChange}
					className="w-full rounded-md border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-2 text-[var(--app-color)] outline-none focus:border-[var(--app-primary)]"
				>
					<option value="light">Claro</option>
					<option value="dark">Escuro</option>
				</select>

				<button
					type="button"
					onClick={resetTheme}
					className="mt-4 w-full rounded-md bg-[var(--app-primary)] px-4 py-2 font-medium text-white transition hover:bg-[var(--app-primary-hover)]"
				>
					Restaurar tema padrão
				</button>
			</section>
		</main>
	);
};

export default Settings;