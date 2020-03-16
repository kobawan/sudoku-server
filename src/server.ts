/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";
import { Logger } from "./logger/logger";
import app from "./app";

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

app.listen(PORT, () => {
  Logger.info("Listening on port", PORT);
});
