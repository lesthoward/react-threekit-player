import { useEffect } from 'react';
import { Player } from "@threekit-tools/treble";
import { useThreekitInitStatus } from '@threekit-tools/treble/dist';

const CustomPlayer = () => {
  const hasLoaded = useThreekitInitStatus();

  useEffect(() => {
    if (hasLoaded) {
      if( (window as any).threekitCentury ) {
        (window as any).threekitCentury.setThreekitVariants()
      }
    }
  }, [hasLoaded])

  return (
    <Player>
      <Player.TopRightWidgets>{/* <Share /> */}</Player.TopRightWidgets>
    </Player>
  )
}

export default CustomPlayer;