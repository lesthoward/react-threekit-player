import { useCallback, useState } from "react";

export function usePlayer(initParams, callback) {
  const [isLoaded, setIsLoaded] = useState(false);
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
        window.century.configurator = await api.getConfigurator();
       })
       .catch((error) => {console.error(error); throw new Error('Threekit sources load fail, Error 401');})
        window.player = player;
      // if(!player){
      //   throw new Error('Threekit sources load fail, Error 401');
      // }
      if (callback) callback(player);
    },
    [callback, initParams, isLoaded]
  );
  const threekitImput = document.querySelector(".threekit--input");
  const threekitImputFile = document.querySelector(".threekit--input__file");

  if(threekitImput && threekitImputFile){

    threekitImput.addEventListener("change", function(e){
      window.century.configurator.setConfiguration({"Add Text": e.target.value});
      document.querySelector(".threekit--input").submit();
    });
    threekitImputFile.addEventListener("change", function(e){
      const [file] = e.target.files;

      console.log("file", URL.createObjectURL(file))
      debugger
      window.century.configurator.setConfiguration({"Upload Logo": URL.createObjectURL(file)});
    })
  }
  return playerRef;
}
