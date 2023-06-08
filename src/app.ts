require("dotenv").config();
import "express-async-errors";

import express, { Application } from "express";
import { handleError } from "./errors";

export const app: Application = express();
app.use(express.json());

app.use(handleError);
