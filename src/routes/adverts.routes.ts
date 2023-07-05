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
import { uploadAdvertImagesMiddleware } from "../middlewares/uploadImagesMiddleware";

const advertsRoutes = Router();

advertsRoutes.post("",
                  upload.fields([{name: "coverImage", maxCount:1},
                  {name: "galleryAdvertisement", maxCount:7}]),
                  uploadAdvertImagesMiddleware,
                  validateTokenMiddleware,
                  validateDataMiddleware(advertisementReqSchema),
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
                  upload.fields([{name: "coverImage", maxCount:1},
                  {name: "galleryAdvertisement", maxCount:7}]),
                  uploadAdvertImagesMiddleware,
                  validateDataMiddleware(advertisementUpdateReqSchema),
                  updateAdvertisementController
                )
advertsRoutes.delete("/:id",
                  validateTokenMiddleware,
                  deleteAdvertisementController
                )

export {advertsRoutes}