import { Router } from "express";
import { loginController } from "../controllers/login/login.controller";
import { validateDataMiddleware } from "../middlewares/validateData.middleware";
import { userLoginSchema } from "../schemas/login.schemas";
import { userReqSchema } from "../schemas/users.schema";
import { registerUserController } from "../controllers/user/registerUser.controller";
import { ensureUserIsNotRegisteredMiddleware } from "../middlewares/ensureUserIsNotRegistered.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { listUserAdvertsController } from "../controllers/adverts/listUserAdverts.controller";
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { getLoggedUserController } from "../controllers/user/getLoggedUser.controller";

const userRouter=Router();

userRouter.post("/login",validateDataMiddleware(userLoginSchema),loginController);
userRouter.post("/register", validateDataMiddleware(userReqSchema), ensureUserIsNotRegisteredMiddleware, registerUserController);

userRouter.get("/:id/adverts", ensureUserExistsMiddleware, listUserAdvertsController);
userRouter.get("/loggedUser",validateTokenMiddleware ,getLoggedUserController);

export {userRouter}