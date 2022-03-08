import React from "react";
import { Player, Share, ThreekitProvider } from "@threekit-tools/treble";

const threekitEnv: string = "preview";

function App() {
  return (
    <ThreekitProvider threekitEnv={threekitEnv}>
      <Player>
        <Player.TopRightWidgets>{/* <Share /> */}</Player.TopRightWidgets>
      </Player>
    </ThreekitProvider>
  );
}

export default App;
