import { Request, Response } from "express";
import { createAnnouncementService } from "../../services/adverts/createAdverts.service";


const createAnnouncementController = async (req: Request, res: Response) => {

    const userId = res.locals.userId

    const newAnnouncement = await createAnnouncementService(userId)

    return res.status(201).json(newAnnouncement)

}

export { createAnnouncementController }


