import { useContext, useEffect, useState } from "react";
import AppSpinner from "../Spinner/AppSpinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { PlayerContext } from "../../context/PlayerContext";
import "./playerAccountStatus.scss";

const PlayerAccountStatus = () => {
  const { playerData, errorMessage } = useContext(PlayerContext);
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

  if (!playerData) {
    return null;
  }

  // if (playerExists === null) {
  //   return <div className="wrapper modal">Сделайте запрос</div>;
  // }
  //  if (playerExists === false && playerData === null) {
  //   return <div className="wrapper modal">Ошибкаа</div>;
  // }

  const player = playerData?.data[0];
  return (
    <div className="wrapper-status">
      <p className="player-title">Player account status</p>
      <div className="player-fields">
        <div>Player ID: <span>{player.id}</span></div>
        <div>Player Clan ID: <span>{player.attributes.clanId}</span></div>
        <div>Player Ban-type: <span>{player.attributes.banType}</span></div>
        <div>Player Platform: <span>{player.attributes.shardId}</span></div>
      </div>
    </div>
  );
};

export default PlayerAccountStatus;
