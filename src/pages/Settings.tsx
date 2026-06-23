import {
	type ChangeEvent,
} from 'react';
import { useSettings } from '../hooks/useSettings';
import type { Theme } from '../contexts/settingsContext';

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
		<main>
			<header>
				<h1>Configurações</h1>

				<p>
					Personalize a aparência da aplicação.
				</p>
			</header>

			<section>
				<div>
					<label htmlFor="theme">
						Tema
					</label>

					<select
						id="theme"
						name="theme"
						value={theme}
						onChange={handleThemeChange}
					>
						<option value="light">
							Claro
						</option>

						<option value="dark">
							Escuro
						</option>
					</select>
				</div>

				<button
					type="button"
					onClick={resetTheme}
				>
					Restaurar tema padrão
				</button>
			</section>
		</main>
	);
};

export default Settings;