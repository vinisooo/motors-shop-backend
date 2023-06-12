import { Router } from "express";
import { loginController } from "../controllers/login/login.controller";
import { validateDataMiddleware } from "../middlewares/validateData.middleware";
import { userLoginSchema } from "../schemas/loginSchema";

const userRouter=Router()

userRouter.post('/login',validateDataMiddleware(userLoginSchema),loginController)

export {userRouter}