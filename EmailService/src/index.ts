import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { server_PORT } from "./common/constants";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use("/", routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || server_PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
