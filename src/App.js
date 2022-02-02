import React from "react";
import "./App.css";
import { usePlayer } from "./Threekit";

function App() {

  //throw this error will render error boundary
  const REACT_APP_THREEKIT_ASSET_ID_TOKEN = "bd4f1238-03e1-48cb-b873-f94875ae4d02";
  const REACT_APP_THREEKIT_ORG_TOKEN = "266241ca-1556-47f5-a3f3-0019e10eab40";
  console.log("process", process.env);
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
