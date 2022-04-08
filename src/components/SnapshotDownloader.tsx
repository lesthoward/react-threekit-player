import React from "react";
import { Button, DownloadIcon } from "@threekit-tools/treble/dist";
import { useName, useSnapshot } from "@threekit-tools/treble";
import watermark from "watermarkjs";

const SnapshotDownloader = () => {
  const productName = useName();
  const takeSnapshots = useSnapshot(undefined, {
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

  const batchWatermark = (snapshot: Blob, wmImage: string) => {
    applyWatermark(
      [snapshot, wmImage],
      watermark.image.upperLeft(0.5),
      (img: any) => {
        applyWatermark(
          [img, wmImage],
          watermark.image.lowerLeft(0.5),
          (img: any) => {
            applyWatermark(
              [img, wmImage],
              watermark.image.upperRight(0.5),
              (img: any) => {
                applyWatermark(
                  [img, wmImage],
                  watermark.image.lowerRight(0.5),
                  (img: any) => {
                    applyWatermark(
                      [img, wmImage],
                      watermark.image.center(0.5),
                      (img: HTMLImageElement) => {
                        const tempLink = document.createElement("a");
                        tempLink.href = img.src;
                        tempLink.download = `Snapshot.png`;
                        document.body.appendChild(tempLink);
                        tempLink.click();
                        document.body.removeChild(tempLink);
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
      if (takeSnapshots) {
        takeSnapshots().then((result) => {
          if (result && result.length > 0) {
            var snapshot = result[0];
            if (snapshot instanceof Blob) {
              batchWatermark(snapshot, watermarkUrl);
            }
          }
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
