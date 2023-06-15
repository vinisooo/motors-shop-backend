import { Router } from "express";
import { loginController } from "../controllers/login/login.controller";
import { validateDataMiddleware } from "../middlewares/validateData.middleware";
import { userLoginSchema } from "../schemas/login.schemas";
import { userReqSchema } from "../schemas/users.schema";
import { registerUserController } from "../controllers/user/registerUser.controller";
import { ensureUserIsNotRegisteredMiddleware } from "../middlewares/ensureUserIsNotRegistered.middleware";

const userRouter=Router();

userRouter.post("/login",validateDataMiddleware(userLoginSchema),loginController);
userRouter.post("/register", validateDataMiddleware(userReqSchema), ensureUserIsNotRegisteredMiddleware, registerUserController);

export {userRouter}