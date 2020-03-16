import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import morgan from "morgan";

import userRouter from "./routes/userRoutes";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(userRouter);

export default app;
