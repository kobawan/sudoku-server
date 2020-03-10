import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";

import { router } from "./config/routes";

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(
  process.env.DB_URL || "",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  error => {
    if (error) {
      console.error(error);
    }
  }
);
mongoose.connection.once("open", () => {
  console.log("Connected to Database 🚦");
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
  console.log("Listening on port", PORT);
});
