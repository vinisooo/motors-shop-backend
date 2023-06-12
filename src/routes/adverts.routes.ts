import { Router } from "express";
import { createAnnouncementController } from "../controllers/adverts/createAdverts.controller";
import { listAdvertsController } from "../controllers/adverts/listAdverts.controller";
import { updateAnnouncementController } from "../controllers/adverts/updateAdverts.controller";
import { deleteAnnouncementController } from "../controllers/adverts/deleteAdverts.controller";


const advertsRoutes = Router();

advertsRoutes.post("", createAnnouncementController);
advertsRoutes.get("",listAdvertsController);
advertsRoutes.patch("", updateAnnouncementController);
advertsRoutes.delete("", deleteAnnouncementController);



export {advertsRoutes}