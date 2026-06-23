import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthProvider';
import { SettingsProvider } from './contexts/SettingsProvider';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MatchDetails from './pages/MatchDetails';
import Matches from './pages/Matches';
import Settings from './pages/Settings';

function App() {
	return (
		<AuthProvider>
			<SettingsProvider>
				<BrowserRouter>
					<Routes>
						<Route
							path="/login"
							element={<Login />}
						/>

						<Route element={<ProtectedRoute />}>
							<Route element={<AppLayout />}>
								<Route
									path="/"
									element={<Dashboard />}
								/>

								<Route
									path="/matches"
									element={<Matches />}
								/>

								<Route
									path="/matches/:id"
									element={<MatchDetails />}
								/>

								<Route
									path="/settings"
									element={<Settings />}
								/>
							</Route>
						</Route>

						<Route
							path="*"
							element={
								<Navigate
									to="/"
									replace
								/>
							}
						/>
					</Routes>
				</BrowserRouter>
			</SettingsProvider>
		</AuthProvider>
	);
}

export default App;