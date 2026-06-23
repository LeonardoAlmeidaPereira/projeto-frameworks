import { useContext } from 'react';
import { SettingsContext } from '../contexts/settingsContext';

export const useSettings = () => {
	const context = useContext(SettingsContext);

	if (!context) {
		throw new Error(
			'useSettings deve ser utilizado dentro de SettingsProvider',
		);
	}

	return context;
};