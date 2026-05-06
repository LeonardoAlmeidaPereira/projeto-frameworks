import type { Player } from "../hooks/useChelseaPlayers";

interface Props {
  player: Player;
}

export function PlayerCard({ player }: Props) {
  return (
    <div className="border border-[#ccc] p-2 m-2">
      {player.strThumb && (
        <img src={player.strThumb} alt={player.strPlayer} width={80} />
      )}

      <h3>{player.strPlayer}</h3>
      <p>{player.strPosition}</p>
    </div>
  );
}