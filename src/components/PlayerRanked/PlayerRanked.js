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

  const currentSeason = seasons.find(
    (season) => season.id === selectedSeasonID
  );

  const formatSeasons = (seasonId) => {
    const match = seasonId.match(/(\d+)$/);
    return match ? parseInt(match[1], 10) : null;
  };

  const formatPlayerRating = (
    playerStats,
    isAvgRank = false,
    top10Ratio = false,
    winRatio = false
  ) => {
    if (isAvgRank) {
      const str = playerStats.toFixed(1);
      const parts = str.split(".");
      return parts[0] + "." + parts[1];
    }
    if (top10Ratio || winRatio) {
      const str = playerStats.toFixed(2);
      const parts = str.split(".");
      const fractionalPart = parts[1];
      const significalDigits = fractionalPart.replace(/^0+/, "");
      return (significalDigits || "0") + "%";
    }
  };

  const playerKDA = (playerStats) => {
    const kills = playerStats.kills;
    const death = playerStats.deaths || playerStats.losses;
    const kda = kills / death;
    return kda.toFixed(2);
  };

   const playerDamage = (playerStats) => {
    const damage = playerStats.damageDealt;
    return damage.toFixed(0);
  };

  const noRankedGame =
    Object.keys(!rankedSquad || {}) === null
      ? "Игрок не учавствовал в ранговых матчах"
      : null;
  const noPublicGame =
    Object.keys(!publicStats || {}) === null
      ? "Игрок не учавствовал в обычных матчах"
      : null;
  return (
    <div className="wrapper">
      <h2>
        Сезон <span>{formatSeasons(currentSeason.id)}</span>
      </h2>
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
        <div className="wrapper-data">
          <div className="wrapper-data-inner">
            <p>
              Срд. рейтинг:
              <span clasName="main-stat">
                {formatPlayerRating(rankedSquad.avgRank, true, false)}
              </span>
            </p>
            <p>
              Общ. матчей сыграно:
              <span>{rankedSquad?.roundsPlayed}</span>
            </p>
            <p>
              Соотношение побед:
              <span>
                {formatPlayerRating(rankedSquad.winRatio, false, false, true)}
              </span>
            </p>
            <p>
              Общ. побед:
              <span>{rankedSquad?.wins}</span>
            </p>
            <p>
              Рейтинг топ-10:
              <span>
                {formatPlayerRating(rankedSquad.top10Ratio, false, true)}
              </span>
            </p>
          </div>
          <div className="wrapper-data-inner">
            <p clasName="main-stat">
              KD:
              <span>{playerKDA(rankedSquad)}</span>
            </p>
            <p>
              Убийства:
              <span>{rankedSquad?.kills}</span>
            </p>
            <p>
              Общ. помощи:
              <span>{rankedSquad?.assists}</span>
            </p>
            <p>
              Общ. вырублено:
              <span>{rankedSquad?.dBNOs}</span>
            </p>
            {/* <p>
              Ранг: {rankedSquad?.currentTier.tier} -{" "}
              {rankedSquad?.currentTier.subTier}
            </p>
            <p>Очки: {rankedSquad?.currentRankPoint}</p> */}
          </div>
          <div className="wrapper-data-inner">
            <p clasName="main-stat">
              Срд. урон:
              <span>{playerKDA(rankedSquad)}</span>
            </p>
            <p>
              Общ. урон:
              <span>{playerDamage(rankedSquad)}</span>
            </p>
            <p>
              Общ. смертей:
              <span>{rankedSquad?.deaths}</span>
            </p>
            <p>
              Общ. поднятий:
              <span>{rankedSquad?.deaths}</span>
            </p>
            <p>
              Срд. время выживания:
              <span>{rankedSquad?.timeSpentDead}</span>
            </p>
            {/* <p>
              Ранг: {rankedSquad?.currentTier.tier} -{" "}
              {rankedSquad?.currentTier.subTier}
            </p>
            <p>Очки: {rankedSquad?.currentRankPoint}</p> */}
          </div>
        </div>
      ) : (
        noRankedGame
      )}
      {publicSquad && activeTab === "public" ? (
        <div className="wrapper-data">
          <div className="wrapper-data-inner">
            <p>KD: {playerKDA(publicSquad)}</p>
            <p>Убийства: {publicSquad?.kills}</p>
            <p>Общ. помощи: {publicSquad?.assists}</p>{" "}
            <p>Общ. смертей: {publicSquad?.dailyKills}</p>
          </div>
        </div>
      ) : (
        noPublicGame
      )}
    </div>
  );
};

export default PlayerRanked;
