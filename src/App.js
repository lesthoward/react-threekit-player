import React from "react";
import "./App.css";
import { usePlayer } from "./Threekit";

function App() {

  //throw this error will render error boundary
  const REACT_APP_THREEKIT_ASSET_ID_TOKEN = "1473d28c-89be-41cb-a415-bc5b912fce32";
  const REACT_APP_THREEKIT_ORG_TOKEN = "dbb6f333-2a61-4412-946a-5ddeb4228e28";
  const playerRef = usePlayer({
    assetId: REACT_APP_THREEKIT_ASSET_ID_TOKEN,
    authToken: process.env.REACT_APP_THREEKIT_AUTH_TOKEN,
    orgId: REACT_APP_THREEKIT_ORG_TOKEN,
    showAR: true,
    showConfigurator: true,
  });
  return (
    <div className="App">
      <Header />

      <div className="App-main">
        <div className="player-el" ref={playerRef} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="App-header">
        <div>
          <a
            href="https://www.threekit.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt="logo"
              className="App-logo"
              src="https://i.imgur.com/zsXaU2U.png"
            />
          </a>
        </div>
        <a
          href="https://github.com/Threekit/Create-React-App"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="docs" src="https://i.imgur.com/v6VIy1K.png" width="25px" />
        </a>
        <a
          href="https://docs.threekit.com/docs/en/player-api"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="docs" src="https://i.imgur.com/jjoaLNA.png" width="25px" />
        </a>
        <button ></button>
    </div>
  );
}

export default App;
