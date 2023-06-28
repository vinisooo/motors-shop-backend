import { Router } from "express";
import { updateAddressController } from "../controllers/address/updateAddress.controller";
import { ensureAddressExistsMiddleware } from "../middlewares/ensureAddressExists.middleware";
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { validateDataMiddleware } from "../middlewares/validateData.middleware";
import { addressUpdateReqSchema } from "../schemas/addresses.schema";
import { isAddressOwnerMiddleware } from "../middlewares/isAddressOwner.middleware";

const addressRoutes = Router();

addressRoutes.patch("/:id", validateTokenMiddleware,ensureAddressExistsMiddleware, validateDataMiddleware(addressUpdateReqSchema), isAddressOwnerMiddleware, updateAddressController)

export {addressRoutes}