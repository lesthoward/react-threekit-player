import { Router, Request, Response } from "express";
import multer from "multer";

import { server_max_img } from "./common/constants";
import { getErrorMessage } from "./common/helpers";
import { RequestData } from "./common/interfaces";
import { generatePdfService, sendQuotation } from "./services";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 8 * 1024 * 1024,
  },
});

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Century Threekit API");
});

const coreFn = async <T>(
  req: Request,
  res: Response,
  contentType: string,
  serviceFn: (data: RequestData, files: Express.Multer.File[]) => Promise<T>
) => {
  res.set({
    "Content-type": contentType,
  });

  try {
    const { body, files } = req;

    const result: T = await serviceFn(
      JSON.parse(body.emailData),
      files as Express.Multer.File[]
    );

    res
      .status(200)
      .send(typeof result === "string" ? { message: result } : result);
  } catch (error) {
    res.status(500).send({ error: getErrorMessage(error) });
  }
};

router.post(
  "/sendQuotation",
  upload.array("files", server_max_img),
  async (req: Request, res: Response) =>
    await coreFn<string>(req, res, "application/json", sendQuotation)
);

router.post(
  "/generatePdf",
  upload.array("files", server_max_img),
  async (req: Request, res: Response) =>
    await coreFn<Buffer>(req, res, "application/pdf", generatePdfService)
);

export default router;
