import puppeteer from "puppeteer";
import { Buffer } from "buffer";

export const generatePdf = (html: string) => {
  return new Promise<Buffer>(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--disable-setuid-sandbox",
          "--no-first-run",
          "--no-sandbox",
          "--no-zygote",
          "--deterministic-fetch",
          "--disable-features=IsolateOrigins",
          "--disable-site-isolation-trials",
          "--incognito",
          "--single-process",
        ],
      });

      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(20000000);
      await page.setContent(html, { waitUntil: "networkidle0" });
      await page.emulateMediaType("print");
      await page.setViewport({ width: 1000, height: 800 });

      const byteArray = await page.pdf({
        format: "letter",
        pageRanges: "1",
        printBackground: true,
      });

      // const buffer = Buffer.from(byteArray, "binary");
      await browser.close();
      resolve(byteArray);
    } catch (err) {
      reject(err);
    }
  });
};
