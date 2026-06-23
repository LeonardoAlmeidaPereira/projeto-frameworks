import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export interface SettingsContextValue {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	resetTheme: () => void;
}

export const SettingsContext =
	createContext<SettingsContextValue | null>(null);