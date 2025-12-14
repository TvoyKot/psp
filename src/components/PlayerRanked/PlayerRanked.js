import { useContext, useState, useEffect } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { useGetRankedStats } from "../../hooks/getRankedStats.hook";
import { useGetPublicStats } from "../../hooks/getPublicStats.hook";
import "./PlayerRanked.scss";
const PlayerRanked = () => {
  const {
    seasons,
    selectedPlatform,
    playerData,
    rankedStats,
    publicStats,
    setRankedStats,
    setPublicStats,
  } = useContext(PlayerContext);
  const { requestRankedStats } = useGetRankedStats();
  const { requestPublicStats } = useGetPublicStats();

  const [activeTab, setActiveTab] = useState("ranked");
  const [selectedSeasonID, setSelectedSeason] = useState(
    seasons.length > 0 ? seasons[0].id : ""
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  useEffect(() => {
    const updateStatsRanked = async () => {
      if ((!playerData, !seasons, !selectedPlatform, !selectedSeasonID)) {
        return;
      } else {
        try {
          const data = await requestRankedStats(
            selectedPlatform,
            playerData?.data[0].id,
            selectedSeasonID
          );
          setRankedStats(data);
        } catch (e) {
          console.error(e);
        }
      }
    };
    const updateStatsPublic = async () => {
      if ((!playerData, !seasons, !selectedPlatform, !selectedSeasonID)) {
        return;
      } else {
        try {
          const data = await requestPublicStats(
            selectedPlatform,
            playerData?.data[0].id,
            selectedSeasonID
          );
          setPublicStats(data);
        } catch (e) {
          console.error(e);
        }
      }
    };
    updateStatsRanked();
    updateStatsPublic();
  }, [
    selectedSeasonID,
    selectedPlatform,
    selectedSeasonID,
    requestRankedStats,
  ]);

  const rankedSquad = rankedStats.data?.attributes.rankedGameModeStats.squad;
  const publicSquad = publicStats.data?.attributes.gameModeStats.squad;
  const noRankedGame =
    Object.keys(rankedStats.data?.attributes.rankedGameModeStats || {})
      .length === 0
      ? "Игрок не учавствовал в ранговых матчах"
      : null;

  const currentSeason = seasons.find(
    (season) => season.id === selectedSeasonID
  );

  const formatSeasons = (seasonId) => {
    const match = seasonId.match(/(\d+)$/);
    return match ? parseInt(match[1], 10) : null;
  };

  return (
    <div className="wrapper">
      <h2>Сезон {formatSeasons(currentSeason.id)}</h2>
      <div className="tabs-wrapper">
        <div className="tabs">
          <button
            className="tab-button"
            id="public"
            onClick={() => {
              handleTabChange("public");
            }}
          >
            Обычная
          </button>
          <button
            className="tab-button"
            id="ranked"
            onClick={() => {
              handleTabChange("ranked");
            }}
          >
            Ранговая
          </button>
        </div>
        <select
          className="select"
          value={selectedSeasonID}
          onChange={handleSeasonChange}
        >
          {seasons.map((season) => {
            const seasonNumber = formatSeasons(season.id);
            return (
              <option key={season.id} value={season.id}>
                {seasonNumber !== null ? `Сезон ${seasonNumber}` : season.id}
              </option>
            );
          })}
        </select>
      </div>
      {rankedSquad && activeTab === "ranked" ? (
        <div>
          <p>
            Ранг: {rankedSquad?.currentTier.tier} - {rankedSquad?.currentTier.subTier}
          </p>
          <p>Очки: {rankedSquad?.currentRankPoint}</p>
        </div>
      ) : (
        noRankedGame
      )}
       {publicSquad && activeTab === "public" ? (
        <div>
          {/* <p>
            Ранг: {publicSquad?.currentTier.tier} - {publicSquad?.currentTier.subTier}
          </p> */}
          <p>Помощи: {publicSquad?.assists}</p>
        </div>
      ) : (
        noRankedGame
      )}
    </div>
  );
};

export default PlayerRanked;
