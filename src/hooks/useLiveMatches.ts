import { useOutletContext } from 'react-router-dom';
import type { LiveMatchesContext } from '../types/worldCup';

export const useLiveMatches = () =>
	useOutletContext<LiveMatchesContext>();