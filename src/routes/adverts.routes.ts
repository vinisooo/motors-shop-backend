import { Router } from "express";
import { createAdvertisementController } from "../controllers/adverts/createAdverts.controller";
import { deleteAdvertisementController } from "../controllers/adverts/deleteAdverts.controller";
import { listAdvertsController } from "../controllers/adverts/listAdverts.controller";
import { updateAdvertisementController } from "../controllers/adverts/updateAdverts.controller";
import { validateDataMiddleware } from "../middlewares/validateData.middleware";
import { advertisementReqSchema, advertisementUpdateReqSchema } from "../schemas/advertisements.schema";
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { getAdvertByIdController } from "../controllers/adverts/getAdvertById.controller";
import { ensureAdvertisementExistsMiddleware } from "../middlewares/ensureAdvertisementExists.middleware";
import upload from "../middlewares/multer";

const advertsRoutes = Router();

advertsRoutes.post("",
                  validateTokenMiddleware,
                  validateDataMiddleware(advertisementReqSchema),
                  upload.array("photos", 12),
                  createAdvertisementController
                )
advertsRoutes.get("", 
                  listAdvertsController
                )
advertsRoutes.get("/:id",
                  ensureAdvertisementExistsMiddleware,
                  getAdvertByIdController
                )
advertsRoutes.patch("/:id",
                  validateDataMiddleware(advertisementUpdateReqSchema),
                  updateAdvertisementController
                )
advertsRoutes.delete("/:id",
                  validateTokenMiddleware,
                  deleteAdvertisementController
                )

export {advertsRoutes}