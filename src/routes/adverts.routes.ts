import { Router } from "express";
import { createAdvertisementController } from "../controllers/adverts/createAdverts.controller";
import { deleteAdvertisementController } from "../controllers/adverts/deleteAdverts.controller";
import { listAdvertsController } from "../controllers/adverts/listAdverts.controller";
import { updateAdvertisementController } from "../controllers/adverts/updateAdverts.controller";
// import { isAdvertisementOwnerMiddleware } from "../middlewares/isAdvertisementOwner.middleware";
// import { isAdvertiserMiddleware } from "../middlewares/isAdvertiser.middleware";
import { validateDataMiddleware } from "../middlewares/validateData.middleware";
// import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { advertisementReqSchema, advertisementUpdateReqSchema } from "../schemas/advertisements.schema";
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";


const advertsRoutes = Router();

advertsRoutes.post("",
                  validateDataMiddleware(advertisementReqSchema),
                  validateTokenMiddleware,
                  createAdvertisementController
                  )
advertsRoutes.get("", 
                  listAdvertsController
                  )
advertsRoutes.patch("",
                  validateDataMiddleware(advertisementUpdateReqSchema),
                  updateAdvertisementController
                  )
advertsRoutes.delete("",
                  deleteAdvertisementController
                  )

export {advertsRoutes}