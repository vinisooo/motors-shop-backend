import { Request, Response } from "express";
import { TAdvertisementReq } from "../../interfaces/advertisements.interfaces";
import { updateAdvertisementService } from "../../services/adverts/updateAdverts.service";


const updateAdvertisementController = async (req: Request, res: Response) => {
    const data: TAdvertisementReq = req.body
    const advertisementId: string = req.params.id
    const updatedAdvertisement = await updateAdvertisementService(data, advertisementId)
    
    return res.status(200).json(updatedAdvertisement)
}

export {updateAdvertisementController}