import { useReducer, type ReactNode } from 'react';
import {
	AuthContext,
	type AuthContextValue,
} from './authContext';

const AUTH_STORAGE_KEY = 'world-cup-user';

interface AuthState {
	user: string | null;
	isAuthenticated: boolean;
}

type AuthAction =
	| {
			type: 'LOGIN';
			payload: string;
	  }
	| {
			type: 'LOGOUT';
	  };

interface AuthProviderProps {
	children: ReactNode;
}

const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);

const initialState: AuthState = {
	user: storedUser,
	isAuthenticated: Boolean(storedUser),
};

const authReducer = (
	state: AuthState,
	action: AuthAction,
): AuthState => {
	switch (action.type) {
		case 'LOGIN':
			return {
				user: action.payload,
				isAuthenticated: true,
			};

		case 'LOGOUT':
			return {
				user: null,
				isAuthenticated: false,
			};

		default:
			return state;
	}
};

export const AuthProvider = ({
	children,
}: AuthProviderProps) => {
	const [state, dispatch] = useReducer(
		authReducer,
		initialState,
	);

	const login = (username: string) => {
		localStorage.setItem(AUTH_STORAGE_KEY, username);

		dispatch({
			type: 'LOGIN',
			payload: username,
		});
	};

	const logout = () => {
		localStorage.removeItem(AUTH_STORAGE_KEY);

		dispatch({
			type: 'LOGOUT',
		});
	};

	const value: AuthContextValue = {
		user: state.user,
		isAuthenticated: state.isAuthenticated,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};