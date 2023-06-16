import { Request, Response } from "express";
import { createAdvertisementService } from "../../services/adverts/createAdverts.service";


const createAdvertisementController = async (req: Request, res: Response) => {

    const userId = req.loggedUser.id
    const data = req.body
    const newAdvertisement = await createAdvertisementService(data,userId)

    return res.status(201).json(newAdvertisement)

}

export { createAdvertisementController }


