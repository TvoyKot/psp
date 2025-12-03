import React from "react";
import SearchPanel from "../SearchPanel/SearchPanel";
import PlatformSelector from "../PlatformSelector/PlatformSelector";
import PlayerAccountStatus from "../PlayerAccountStatus/PlayerAccountStatus";
import { PlayerProvider } from "../../context/PlayerContext";

import "./app.scss";

function App() {
  return (
    <PlayerProvider>
      <main className="app">
        <div className="content">
          <PlatformSelector />
          <SearchPanel />
          <PlayerAccountStatus />
        </div>
      </main>
    </PlayerProvider>
  );
}

export default App;
