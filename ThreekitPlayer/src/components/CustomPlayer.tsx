import { useEffect } from "react";
import { Player, Share } from "@threekit-tools/treble";
import { useThreekitInitStatus } from "@threekit-tools/treble/dist";
import {
  dataURItoFile,
  getCameraPosition,
  setCameraPosition,
} from "@threekit-tools/treble/dist/utils";
import Snapshots from "@threekit-tools/treble/dist/Treble/Snapshots";
import {
  IDisplayAttributeString,
  IDisplayAttributeStringValue,
  IThreekitDisplayAttribute,
} from "@threekit-tools/treble/dist/threekit";

import { SNAPSHOT_DEFAULT_FORMAT } from "../common/constants";
import SnapshotDownloader from "./SnapshotDownloader";

const CustomPlayer = () => {
  const hasLoaded: boolean = useThreekitInitStatus();
  const snapshotButtonKey: string | undefined =
    process.env.REACT_APP_SNAPSHOT_BUTTONKEY;
  const isSnapshotButtonVisible: boolean = snapshotButtonKey
    ? !!localStorage.getItem(snapshotButtonKey)
    : false;

  const takeSnapshots = (attrName: string, exclusionCams: string[] = []) => {
    const attr: IThreekitDisplayAttribute | undefined =
      window.threekit.configurator.getDisplayAttributes().find(function (el) {
        return el.name === attrName;
      });

    if (attr) {
      const cameraVal = attr.value;
      const cameraPosition = getCameraPosition(window.threekit.player.camera);
      let cameras: object = {};
      (attr as IDisplayAttributeString).values.forEach(
        (opt: IDisplayAttributeStringValue) => {
          if (!exclusionCams.includes(opt.label)) {
            cameras = Object.assign(cameras, { [opt.label]: opt.value });
          }
        }
      );

      const snapshotCls = new Snapshots();
      return new Promise<File[]>(async (resolve, reject) => {
        const camerasArr = Object.keys(cameras);
        snapshotCls
          .getSnapshots(camerasArr, {
            attributeName: attrName,
            format: SNAPSHOT_DEFAULT_FORMAT,
            size: { width: 1080, height: 1080 },
          })
          .then((result: string[]) => {
            const files: File[] = result.map((snp, idx) => {
              return dataURItoFile(
                snp,
                `${camerasArr[idx]}.${SNAPSHOT_DEFAULT_FORMAT}`
              );
            });

            resolve(files);
          })
          .catch(reject)
          .finally(() => {
            window.threekit.configurator
              .setConfiguration({
                [attrName]: cameraVal,
              })
              .then(() => {
                setCameraPosition(
                  window.threekit.player.camera,
                  cameraPosition
                );
              });
          });
      });
    }
  };

  useEffect(() => {
    if (hasLoaded) {
      if ((window as any).threekitCentury) {
        (window as any).threekitCentury = Object.assign(
          (window as any).threekitCentury,
          { takeSnapshots: takeSnapshots }
        );
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
