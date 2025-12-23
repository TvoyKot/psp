import { useContext, useEffect, useState } from "react";
import AppSpinner from "../Spinner/AppSpinner";
import { PlayerContext } from "../../context/PlayerContext";
import "./playerAccountStatus.scss";

const PlayerAccountStatus = () => {
  const { playerData } = useContext(PlayerContext);
  const [loading, setLoading] = useState(false);
  const [playerExists, setPlayerExists] = useState(null);
  const [hasQueried, setHasQueried] = useState(false);

  useEffect(() => {
    if (playerData !== null) {
      setHasQueried(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (!playerData.data || playerData.data.length === 0) {
          setPlayerExists(false);
        } else {
          setPlayerExists(true);
        }
      }, 300);
    }
  }, [playerData]);

  if (loading) {
    return <AppSpinner />;
  }

  // if (!playerData.data[0].id) {
  //   return <div className="wrapper modal">Данных об игроке нет</div>;
  // }

    if (!playerData) {
    return <div className="wrapper modal">Сделайте запрос</div>;
  }

  const player = playerData?.data[0];

  return (
    <div className="wrapper-status">
      <p className="player-title">Player account status</p>
      <div className="player-fields">
        <div>Player ID: {player.id}</div>
        <div>Player Clan ID: {player.attributes.clanId}</div>
        <div>Player Ban-type: {player.attributes.banType}</div>
        <div>Player Platform: {player.attributes.shardId}</div>
      </div>
    </div>
  );
};

export default PlayerAccountStatus;
