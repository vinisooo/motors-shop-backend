import { Request, Response } from "express";
import { listAdvertsService } from "../../services/adverts/listAdverts.service";



const listAdvertsController = async (req: Request, res: Response) => {

    const adverts = await listAdvertsService(req.query)
    return res.json(adverts)
}

export {listAdvertsController}