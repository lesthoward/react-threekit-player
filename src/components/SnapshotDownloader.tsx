import React from "react";
import { Button, DownloadIcon, message } from "@threekit-tools/treble/dist";
import { useName, useSnapshot } from "@threekit-tools/treble";
import Snapshots from "@threekit-tools/treble/dist/Treble/Snapshots";
import {
  dataURItoBlob,
  downloadSnapshot,
} from "@threekit-tools/treble/dist/utils";
import watermark from "watermarkjs";

import { SNAPSHOT_DEFAULT_FORMAT } from "../common/constants";

const SnapshotDownloader = () => {
  const prodName: string | undefined = useName();
  const takeSnapshot = useSnapshot("Back Camera", {
    output: "blob",
    filename: "snapshot",
  });

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

  const createWatermark = (snapshot: Blob, wmImage: HTMLImageElement) => {
    watermark([snapshot, wmImage]) //watermarkUrl])
      // .image(watermark.image.upperLeft(0.5))
      // .then((img: any) => {});
      // .image(watermark.image.upperRight(0.5))
      // .image(watermark.image.lowerLeft(0.5))
      // .image(watermark.image.lowerRight(0.5))
      .image(watermark.image.center(0.5))
      .then((img: any) => {
        console.log(img);
        var elem = document.querySelector(".threekit");
        if (elem) {
          elem.appendChild(img);
        }
      });
  };

  const fetchImage = (url: string, snapshot: Blob) => {
    fetch(url).then((imageResult) => {
      imageResult.blob().then((imageBlob) => {
        var watermarkImg = new Image();
        watermarkImg.src = URL.createObjectURL(imageBlob);
        watermarkImg.crossOrigin = "anonymous";

        createWatermark(snapshot, watermarkImg);
      });
    });
  };

  const batchWatermark = (
    snapshot: Blob,
    wmImage: string,
    callbackFn: (img: HTMLImageElement) => void
  ) => {
    applyWatermark(
      [snapshot, wmImage],
      watermark.image.upperLeft(0.5),
      (img: HTMLImageElement) => {
        applyWatermark(
          [img, wmImage],
          watermark.image.lowerLeft(0.5),
          (img: HTMLImageElement) => {
            applyWatermark(
              [img, wmImage],
              watermark.image.upperRight(0.5),
              (img: HTMLImageElement) => {
                applyWatermark(
                  [img, wmImage],
                  watermark.image.lowerRight(0.5),
                  (img: HTMLImageElement) => {
                    applyWatermark(
                      [img, wmImage],
                      watermark.image.center(0.5),
                      (img: HTMLImageElement) => {
                        callbackFn(img);
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
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
            batchWatermark(snpBlob, watermarkUrl, (img) => {
              downloadSnapshot(
                img.src,
                `${
                  prodName ? prodName + "-" : ""
                }snapshot.${SNAPSHOT_DEFAULT_FORMAT}`
              );
            });
          });
      }
    } else {
      console.warn("No image url for watermark provided!");
    }
  };

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
