import "reflect-metadata";
require("dotenv").config();
import "express-async-errors";
const cors = require("cors");

import express, { Application } from "express";
import { handleError } from "./errors";
import { advertsRoutes } from "./routes/adverts.routes";
import { userRouter } from "./routes/user.routes";
import { commentsRouter } from "./routes/comments";
import { addressRoutes } from "./routes/addresses.routes";

export const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/adverts", advertsRoutes);
app.use("/users",userRouter);
app.use("/comments",commentsRouter)
app.use("/address",addressRoutes);

app.use(handleError);
