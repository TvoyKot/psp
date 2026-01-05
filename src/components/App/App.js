import React, { useContext } from "react";
import SearchPanel from "../SearchPanel/SearchPanel";
import PlatformSelector from "../PlatformSelector/PlatformSelector";
import PlayerAccountStatus from "../PlayerAccountStatus/PlayerAccountStatus";
import PlayerRanked from "../PlayerRanked/PlayerRanked";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { PlayerContext } from "../../context/PlayerContext";
import "./app.scss";

function App(props) {
  const { rankedStats } = useContext(PlayerContext);
  const childrenCount = React.Children.count(props.children);
  const showPlayRanked = rankedStats ? <PlayerRanked /> : null;
  return (
    <main className="app">
      <div className={`content ${childrenCount === 1 ? "single-child" : ""}`}>
        <div>
          <PlatformSelector />
          {/* <ErrorBoundary> */}
            <SearchPanel />
          {/* </ErrorBoundary> */}
          {/* <ErrorBoundary> */}
            <PlayerAccountStatus />
          {/* </ErrorBoundary> */}
        </div>
        <ErrorBoundary>
            {showPlayRanked}
        </ErrorBoundary>
      </div>
    </main>
  );
}

export default App;
