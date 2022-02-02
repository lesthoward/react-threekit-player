import { useCallback, useState } from "react";

export function usePlayer(initParams, callback) {
  const [isLoaded, setIsLoaded] = useState(false);
  let player
  const playerRef = useCallback(
    async (el) => {
      if (!el || isLoaded) return;
      setIsLoaded(true);
      const player = await window.threekitPlayer({   
        assetId: initParams.assetId,
        el: el,
        authToken: initParams.authToken,
        orgId: initParams.orgId,
        showAR: initParams.showAR,
        showConfigurator: initParams.showConfigurator,
       })
       .then(async(api) => {
        api.enableApi("configurator");
        api.enableApi("player");
        api.enableApi("store");
        await api.when("loaded");
        window.century = api;
       } )
       .catch((error) => {console.error(error)})
      window.player = player;
      if(!player){
        throw new Error('Threekit sources load fail, Error 401');
      }
      if (callback) callback(player);
    },
    [callback, initParams, isLoaded]
  );
  return playerRef;
}
