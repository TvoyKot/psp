
import React, { createContext, useState } from "react";

export const PlayerContext = createContext({
  playerData: null,
  selectedPlatform: "psn",
  seasons: null,
  rankedStats: null,
  publicStats: null,
  setPlayerData: () => {},
  setSelectedPlatform: () => {},
  setSeasons: () => {},
  setRankedStats: () => {},
  setPublicStats: () => {},
});

export const PlayerProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState("psn");
  const [seasons, setSeasons] = useState([]);
  const [rankedStats, setRankedStats] = useState(null);
  const [publicStats, setPublicStats] = useState(null);
  return (
    <PlayerContext.Provider
      value={{
        playerData,
        selectedPlatform,
        seasons,
        rankedStats,
        publicStats,
        setPlayerData,
        setSelectedPlatform,
        setSeasons,
        setRankedStats,
        setPublicStats,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
