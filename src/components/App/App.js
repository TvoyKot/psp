import React, { useContext } from "react";
import SearchPanel from "../SearchPanel/SearchPanel";
import PlatformSelector from "../PlatformSelector/PlatformSelector";
import AppSpinner from "../Spinner/AppSpinner";
import PlayerAccountStatus from "../PlayerAccountStatus/PlayerAccountStatus";
import PlayerRanked from "../PlayerRanked/PlayerRanked";
import { PlayerContext } from "../../context/PlayerContext";
import "./app.scss";

function App(props) {
  const { rankedStats } = useContext(PlayerContext);
  const childrenCount = React.Children.count(props.children);
  const showPlayRanked = rankedStats ? <PlayerRanked /> : null;
  return (
    // <PlayerProvider>
      <main className="app">
        <div className={`content ${childrenCount === 1 ? "single-child" : ""}`}>
          <div>{showPlayRanked}</div>
          <div>
            <PlatformSelector />
            <SearchPanel />
            <PlayerAccountStatus />
          </div>
        </div>
      </main>
    // </PlayerProvider>
  );
}

export default App;
