import { Request, Response } from "express";
import { deleteAnnouncementService } from "../../services/adverts/deleteAdverts.service";


const deleteAnnouncementController = async (req: Request, res: Response) => {

    const announcementId = req.params.id
    await deleteAnnouncementService(announcementId)
    res.status(204).send()
    
}

export {deleteAnnouncementController}
