import { Request, Response } from "express";
import { getAdvertByIdService } from "../../services/adverts/getAdvertById.service";

const getAdvertByIdController = async(req: Request, res: Response) => {
    const advertisementId = req.params.id
    const advert = await getAdvertByIdService(advertisementId)

    return res.status(200).json(advert)
}

export { getAdvertByIdController }