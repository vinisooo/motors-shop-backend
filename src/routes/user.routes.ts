import { Router } from "express";
import { loginController } from "../controllers/login/login.controller";
import { validateDataMiddleware } from "../middlewares/validateData.middleware";
import { userLoginSchema } from "../schemas/login.schemas";
import { userRegisterSchema } from "../schemas/user.schemas";
import { registerUserController } from "../controllers/user/registerUser.controller";

const userRouter=Router();

userRouter.post("/login",validateDataMiddleware(userLoginSchema),loginController);
userRouter.post("/register", validateDataMiddleware(userRegisterSchema), registerUserController);

export {userRouter}