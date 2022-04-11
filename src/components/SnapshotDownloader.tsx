import React from "react";
import { Button, DownloadIcon, message } from "@threekit-tools/treble/dist";
import {
  useName,
  useSnapshot,
  useThreekitInitStatus,
} from "@threekit-tools/treble";
import Snapshots from "@threekit-tools/treble/dist/Treble/Snapshots";
import {
  dataURItoBlob,
  downloadSnapshot,
} from "@threekit-tools/treble/dist/utils";
import watermark from "watermarkjs";

import { SNAPSHOT_DEFAULT_FORMAT } from "../common/constants";

const SnapshotDownloader = () => {
  const hasLoaded: boolean = useThreekitInitStatus();
  const prodName: string | undefined = useName();
  const takeSnapshot = useSnapshot("Back Camera", {
    output: "blob",
    filename: "snapshot",
  });

  const wmPosition = {
    upperLeft: watermark.image.upperLeft(0.5),
    lowerLeft: watermark.image.lowerLeft(0.5),
    upperRight: watermark.image.upperRight(0.5),
    lowerRight: watermark.image.lowerRight(0.5),
    center: watermark.image.center(0.5),
  };

  const applyWatermark = (
    resources: any[],
    positionFn: any,
    callbackFn: (img: any) => void
  ) => {
    watermark(resources, {
      init: (img: HTMLImageElement) => (img.crossOrigin = "anonymous"),
    })
      .image(positionFn)
      .then(callbackFn);
  };

  const batchWatermark = (
    snapshot: Blob,
    wmImage: string,
    wmPosition: any[],
    callbackFn: (img: HTMLImageElement) => void
  ) => {
    const applyWatermarkRcr = (
      snapshot: Blob | HTMLImageElement,
      wmImage: string,
      wmPosition: any[],
      callbackFn: (img: HTMLImageElement) => void
    ) => {
      if (wmPosition.length > 0) {
        applyWatermark(
          [snapshot, wmImage],
          wmPosition[0],
          (img: HTMLImageElement) => {
            wmPosition.shift();
            if (wmPosition.length > 0) {
              applyWatermarkRcr(img, wmImage, wmPosition, callbackFn);
            } else {
              callbackFn(img);
            }
          }
        );
      }
    };

    applyWatermarkRcr(snapshot, wmImage, wmPosition, callbackFn);
  };

  const handleDownload = () => {
    const watermarkUrl: string | undefined =
      process.env.REACT_APP_WATERMARK_URL;

    if (watermarkUrl) {
      if (takeSnapshot) {
        const snapshotCls = new Snapshots();
        message.info("Downloading Image", DownloadIcon.iconName);
        snapshotCls
          .getSnapshot({
            format: SNAPSHOT_DEFAULT_FORMAT,
            size: { width: 1080, height: 1080 },
          })
          .then((result: string) => {
            const snpBlob = dataURItoBlob(result);
            batchWatermark(
              snpBlob,
              watermarkUrl,
              [
                wmPosition.upperLeft,
                wmPosition.upperRight,
                wmPosition.lowerRight,
                wmPosition.lowerLeft,
                wmPosition.center,
              ],
              (img) => {
                downloadSnapshot(
                  img.src,
                  `${
                    prodName ? prodName + "-" : ""
                  }snapshot.${SNAPSHOT_DEFAULT_FORMAT}`
                );
              }
            );
          });
      }
    } else {
      console.warn("No image url for watermark provided!");
    }
  };

  if (!hasLoaded) {
    return <></>;
  }

  return (
    <Button
      icon={DownloadIcon.iconName}
      shape="round"
      type="standard"
      onClick={handleDownload}
    />
  );
};

export default SnapshotDownloader;
