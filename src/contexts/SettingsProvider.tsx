import {
	useEffect,
	useState,
	type ReactNode,
} from 'react';
import {
	SettingsContext,
	type Theme,
} from './settingsContext';

const THEME_STORAGE_KEY = 'world-cup-theme';
const DEFAULT_THEME: Theme = 'light';

interface SettingsProviderProps {
	children: ReactNode;
}

const getInitialTheme = (): Theme => {
	const storedTheme = localStorage.getItem(
		THEME_STORAGE_KEY,
	);

	if (storedTheme === 'light' || storedTheme === 'dark') {
		return storedTheme;
	}

	return DEFAULT_THEME;
};

export const SettingsProvider = ({
	children,
}: SettingsProviderProps) => {
	const [theme, setThemeState] =
		useState<Theme>(getInitialTheme);

	useEffect(() => {
		localStorage.setItem(THEME_STORAGE_KEY, theme);

		document.documentElement.dataset.theme = theme;
		document.documentElement.style.colorScheme = theme;
	}, [theme]);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
	};

	const resetTheme = () => {
		setThemeState(DEFAULT_THEME);
	};

	return (
		<SettingsContext.Provider
			value={{
				theme,
				setTheme,
				resetTheme,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};