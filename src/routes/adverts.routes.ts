import { Router } from "express";
import { createAnnouncementController } from "../controllers/adverts/createAdverts.controller";


const advertsRoutes = Router()

advertsRoutes.post("",createAnnouncementController)

export {advertsRoutes}