import { Request, Response } from "express";
import { createAnnouncementService } from "../../services/adverts/createAdverts.service";


const createAnnouncementController = async (req: Request, res: Response) => {

    const userId = res.locals.userId

    const newAdverts = await createAnnouncementService(userId)

    return res.status(201).json(newAdverts)

}

export { createAnnouncementController }


