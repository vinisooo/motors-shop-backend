import { Request, Response } from "express";
import { updateAnnouncementService } from "../../services/adverts/updateAdverts.service";


const updateAnnouncementController = async (req: Request, res: Response) => {

    const announcementId = req.params.id
    const update = await updateAnnouncementService( announcementId)
    return res.json(update)
    
}

export {updateAnnouncementController}