import { useEffect } from "react";
import { Player } from "@threekit-tools/treble";
import { useThreekitInitStatus } from "@threekit-tools/treble/dist";
import SnapshotDownloader from "./SnapshotDownloader";

const CustomPlayer = () => {
  const hasLoaded: boolean = useThreekitInitStatus();
  const snapshotButtonKey: string | undefined =
    process.env.REACT_APP_SNAPSHOT_BUTTONKEY;
  const isSnapshotButtonVisible: boolean = snapshotButtonKey
    ? !!localStorage.getItem(snapshotButtonKey)
    : false;

  useEffect(() => {
    if (hasLoaded) {
      if ((window as any).threekitCentury) {
        (window as any).threekitCentury.setThreekitVariants();
      }
    }
  }, [hasLoaded]);

  return (
    <Player>
      <Player.TopRightWidgets>
        {/* <Share /> */}
        {isSnapshotButtonVisible && <SnapshotDownloader />}
      </Player.TopRightWidgets>
    </Player>
  );
};

export default CustomPlayer;
