import { useChelseaPlayers } from "../hooks/useChelseaPlayers";
import { PlayerCard } from "../components/PlayerCard";

export default function Chelsea() {
  const { players, loading } = useChelseaPlayers();

  if (loading) return <p>Carregando jogadores...</p>;

  return (
    <div>
      <h1>🔵 Chelsea Squad</h1>

      {players.map((player) => (
        <PlayerCard key={player.idPlayer} player={player} />
      ))}
    </div>
  );
}