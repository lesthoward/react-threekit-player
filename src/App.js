import React, {useContext, useEffect} from 'react';
import "./App.css";
import { usePlayer } from "./Threekit";
import { AppContext } from "./provider/provider.js"

function App() {
  const {state, setState} = useContext(AppContext);
  const playerRef = usePlayer({
    assetId: process.env.NODE_ENV === "development" ? process.env.REACT_APP_THREEKIT_ASSET_ID_TOKEN : "f17593e4-7497-4749-8ac3-a04cacec1934",
    authToken: process.env.NODE_ENV === "development" ? process.env.REACT_APP_THREEKIT_AUTH_TOKEN : "2a45c4c4-1597-4fbe-8016-ea0bf04f0bd1",
    orgId: process.env.NODE_ENV === "development" ? process.env.REACT_APP_THREEKIT_ORG_TOKEN : "266241ca-1556-47f5-a3f3-0019e10eab40",
    showAR: true,
    showConfigurator: true,
  });
  return (
    <div className="app">
      <Header />
      <div className="app--main">
        <div className="app--player" ref={playerRef} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="app--header">

    </div>
  );
}

export default App;
