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
    return null;
  };

  const playerKDA = (playerStats) => {
    const kills = playerStats.kills;
    const death = playerStats.deaths || playerStats.losses;
    const kda = kills / death;
    if (kills === 0 && death === 0) {
      return "К сожалению игрок никого не убил!";
    }
    return kda.toFixed(2);
  };

  const playerDamage = (playerStats) => {
    const damage = playerStats.damageDealt;
    return damage.toFixed(0);
  };

  const playerAvgDamage = (playerStats) => {
    const damage = playerStats.damageDealt;
    const deaths = playerStats.deaths;
    const avgDamage = damage / deaths;
    return avgDamage.toFixed(0);
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
          <div className="best-rank">
            <div className="best-rank__item">
              Высший ранг: <span>{rankedSquad.bestTier.tier}</span>
              <span> ({rankedSquad.bestTier.subTier})</span>
            </div>
            <div className="best-rank__item">
              Текущий ранг: <span>{rankedSquad.currentTier.tier}</span>
              <span> ({rankedSquad.currentTier.subTier})</span>
            </div>
          </div>
          <div className="wrapper-data-outer">
            <div className="wrapper-data-inner">
              <p>
                Срд. рейтинг:
                <span className="main-stat">
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
            </div>
            <div className="wrapper-data-inner">
              <p clasName="main-stat">
                Срд. урон:
                <span>{playerAvgDamage(rankedSquad)}</span>
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
            </div>
          </div>
        </div>
      ) : (
        noRankedGame
      )}
      {publicSquad && activeTab === "public" ? (
        <div className="wrapper-data">
          <div className="wrapper-data-outer">
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
              <p>
                KD: <span className="main-stat">{playerKDA(publicSquad)}</span>
              </p>
              <p>
                Убийства:
                <span>{publicSquad?.kills}</span>
              </p>
              <p>
                Общ. помощи:
                <span>{publicSquad?.assists}</span>
              </p>{" "}
              <p>
                Общ. смертей:
                <span>{publicSquad?.losses}</span>
              </p>
            </div>
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
          </div>
        </div>
      ) : (
        noPublicGame
      )}
    </div>
  );
};

export default PlayerRanked;
