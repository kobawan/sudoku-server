/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";

import { router } from "./routes/userRoutes";
import { Logger } from "./logger/logger";

const app = express();
const PORT = process.env.PORT || 4000;

const isProdEnv = process.env.NODE_ENV === "production";

const DATABASE_URL = isProdEnv
  ? process.env.DB_URL_PROD
  : process.env.DB_URL_DEV;

mongoose.connect(
  DATABASE_URL || "",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  error => {
    if (error) {
      Logger.error(error);
    }
  }
);
mongoose.connection.once("open", () => {
  Logger.info(
    `Connected to database ${isProdEnv ? "'sudoku-prod'" : "'sudoku-dev'"} 🚦`
  );
});

app.use(compression());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(cors());

app.use(router);

app.listen(PORT, () => {
  Logger.info("Listening on port", PORT);
});
