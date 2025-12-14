import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App";
import { PlayerProvider } from "./context/PlayerContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </React.StrictMode>
);
