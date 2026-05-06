const BASE_URL = "https://www.thesportsdb.com/api/v1/json/123";

export interface Player {
  idPlayer: string;
  strPlayer: string;
  strPosition: string;
  strThumb: string;
}

export interface Event {
  idEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string;
  intAwayScore: string;
  dateEvent: string;
}

export async function getChelseaPlayers(): Promise<Player[]> {
  const res = await fetch(`${BASE_URL}/lookup_all_players.php?id=133610`);
  const data = await res.json();
  return data.player || [];
}

export async function getChelseaLastGames(): Promise<Event[]> {
  const res = await fetch(`${BASE_URL}/eventslast.php?id=133610`);
  const data = await res.json();
  return data.results || [];
}