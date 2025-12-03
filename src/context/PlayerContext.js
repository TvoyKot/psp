import React, { createContext, useState } from "react";

export const PlayerContext = createContext({
  playerData: null,
  setPlayerData: () => {},
});

export const PlayerProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState(null);
  return (
    <PlayerContext.Provider value={{ playerData, setPlayerData }}>
      {children}
    </PlayerContext.Provider>
  );
};