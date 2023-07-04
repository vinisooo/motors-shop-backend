import { Request, Response } from "express";
import { deleteAdvertisementService } from "../../services/adverts/deleteAdverts.service";


const deleteAdvertisementController = async (req: Request, res: Response) => {

    const advertisementId = req.params.id
    await deleteAdvertisementService(advertisementId)
    res.status(204).send()
    
}

export {deleteAdvertisementController}
