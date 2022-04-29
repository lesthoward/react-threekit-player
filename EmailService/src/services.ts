import path from "path";
import { Attachment } from "postmark";

import {
  server_img_naming_exclusions,
  server_max_img,
} from "./common/constants";
import { File, RequestData } from "./common/interfaces";
import { generateTemplate } from "./utils/template";
import { generatePdf } from "./utils/pdf";
import { buildEmailModel, sendEmail } from "./utils/email";

const coreFn = <T>(
  request: RequestData,
  files: Express.Multer.File[],
  callbackFn: (
    result: Buffer,
    resolve: (value: T | PromiseLike<T>) => void
  ) => void
) => {
  const snapshots: File[] = files.map((f) => ({
    name: path.parse(f.originalname).name.replace("_", " "),
    base64File: f.buffer.toString("base64"),
  }));

  const template = generateTemplate({
    ...request,
    imageSrcUrl: process.env.IMAGES_URL ?? "",
    snapshots: [
      ...snapshots,
      ...new Array(server_max_img - snapshots.length).fill({
        name: "",
        base64File: "",
      }),
    ],
  });

  if (template) {
    return new Promise<T>(async (resolve, reject) => {
      generatePdf(template)
        .then((result) => {
          callbackFn(result, resolve);
        })
        .catch((error) => {
          reject(error);
        });
    });
  } else {
    throw new Error("Error generating pdf file");
  }
};

export const sendQuotation = (
  request: RequestData,
  files: Express.Multer.File[]
) => {
  const attachments: Attachment[] = files
    .filter(
      (f) =>
        server_img_naming_exclusions.filter((e) =>
          f.originalname.toLowerCase().includes(e)
        ).length === 0
    )
    .map((f) => ({
      Name: f.originalname,
      Content: f.buffer.toString("base64"),
      ContentType: f.mimetype,
      ContentID: null,
    }));

  return coreFn<string>(request, files, (result, resolve) => {
    sendEmail(
      buildEmailModel(
        {
          configurationUrl: request.threekitConfUrl,
          companyName: request.customerData.companyName,
          companyContactName: request.customerData.contactName,
          companyEmail: request.customerData.email,
        },
        [
          {
            Name: `${request.customerData.companyName} - Quote.pdf`,
            Content: result.toString("base64"),
            ContentType: "application/octet-stream",
            ContentID: null,
          },
          ...attachments,
        ]
      )
    ).then((msg) => {
      resolve(msg);
    });
  });
};

export const generatePdfService = (
  request: RequestData,
  files: Express.Multer.File[]
) => {
  return coreFn<Buffer>(request, files, (result, resolve) => {
    resolve(result);
  });
};
