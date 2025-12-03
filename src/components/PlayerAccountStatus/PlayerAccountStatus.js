import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "./playerAccountStatus.scss";

const PlayerAccountStatus = () => {
  const { playerData } = useContext(PlayerContext);

  if (!playerData) {
    return <div className="wrapper">Данных об игроке нет</div>;
  }

  const player = playerData?.data[0];
  console.log(player);

  return (
    <div className="wrapper">
      <p className="player-title">Player account status</p>
      <div className="player-fields">
        <div>
          Player ID: {player.id}
        </div>
        <div>
          Player Clan ID: {player.attributes.clanId}
        </div>
        <div>
          Player Ban-type: {player.attributes.banType}
        </div>
        <div>
          Player Platform: {player.attributes.shardId}
        </div>
      </div>
    </div>
  );
};
export default PlayerAccountStatus;
