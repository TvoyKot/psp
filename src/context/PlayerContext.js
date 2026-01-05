import React, { createContext, useState } from "react";

export const PlayerContext = createContext({
  playerData: null,
  selectedPlatform: "psn",
  seasons: null,
  rankedStats: null,
  publicStats: null,
  errorMessage: null,
  errorImageUrl: "../../assets/FailedImage.png",
  setPlayerData: () => {},
  setSelectedPlatform: () => {},
  setSeasons: () => {},
  setRankedStats: () => {},
  setPublicStats: () => {},
  setErrorMessage: () => {},
});

export const PlayerProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState("psn");
  const [seasons, setSeasons] = useState([]);
  const [rankedStats, setRankedStats] = useState(null);
  const [publicStats, setPublicStats] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const clearError = () => setErrorMessage(null);
  return (
    <PlayerContext.Provider
      value={{
        playerData,
        selectedPlatform,
        seasons,
        rankedStats,
        publicStats,
        errorMessage,
        setPlayerData,
        setSelectedPlatform,
        setSeasons,
        setRankedStats,
        setPublicStats,
        setErrorMessage,
        clearError,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
