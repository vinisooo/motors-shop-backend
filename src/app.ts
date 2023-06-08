require("dotenv").config();
import "express-async-errors";

import express, { Application } from "express";
import { handleError } from "./errors";
import { advertsRoutes } from "./routes/adverts.routes";

export const app: Application = express();
app.use(express.json());
app.use("/adverts", advertsRoutes);

app.use(handleError);
