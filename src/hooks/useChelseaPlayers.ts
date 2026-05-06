import { useEffect, useState } from "react";

export interface Player {
  idPlayer: string;
  strPlayer: string;
  strPosition: string;
  strThumb: string | null;
}

export function useChelseaPlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await fetch(
          "https://www.thesportsdb.com/api/v1/json/123/lookup_all_players.php?id=133610"
        );
        const data = await res.json();

        setPlayers(data.player || []);
      } catch (error) {
        console.error("Erro ao buscar jogadores:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayers();
  }, []);

  return { players, loading };
}