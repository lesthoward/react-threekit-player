import fs from "fs";
import path from "path";
import handlebars from "handlebars";

import { Template } from "../common/interfaces";

export const generateTemplate = (tpltData: Template): string | undefined => {
  try {
    const html = fs.readFileSync(
      path.resolve("./src/assets/template.html"),
      "utf8"
    );

    if (!html) {
      return undefined;
    }

    const templateFnc = handlebars.compile(html);

    return templateFnc(tpltData);
  } catch (error) {
    throw new Error("Error generating template");
  }
};
