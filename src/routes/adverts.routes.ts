import { Router } from "express";
import { createAdvertisementController } from "../controllers/adverts/createAdverts.controller";
import { deleteAdvertisementController } from "../controllers/adverts/deleteAdverts.controller";
import { updateAdvertisementController } from "../controllers/adverts/updateAdverts.controller";
import { isAdvertiserMiddleware } from "../middlewares/isAdvertiser.middleware";
import { validateDataMiddleware } from "../middlewares/validateData.middleware";
import { advertisementReqSchema, advertisementUpdateReqSchema } from "../schemas/advertisements.schema";
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { isAdvertisementOwnerMiddleware } from "../middlewares/isAdvertisementOwner.middleware";
import { ensureAdvertisementExistsMiddleware } from "../middlewares/ensureAdvertisementExists.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";


const advertsRoutes = Router();

advertsRoutes.post("",  
                  validateTokenMiddleware,
                  isAdvertiserMiddleware,
                  validateDataMiddleware(advertisementReqSchema),
                  createAdvertisementController
                  )
advertsRoutes.patch("/:id",
                  validateTokenMiddleware,
                  ensureAdvertisementExistsMiddleware,
                  isAdvertisementOwnerMiddleware,
                  validateDataMiddleware(advertisementUpdateReqSchema),
                  updateAdvertisementController
                  )
advertsRoutes.delete("/:id",
                  validateTokenMiddleware,
                  ensureAdvertisementExistsMiddleware,
                  isAdvertisementOwnerMiddleware,
                  deleteAdvertisementController
                  )

export {advertsRoutes}