import { Request, Response } from "express";
import { listAdvertsService } from "../../services/adverts/listAdverts.service";



const listAdvertsController = async (req: Request, res: Response) => {

    const userId = res.locals.userId
    const adverts  = await listAdvertsService(userId)

    return res.json(adverts)
}

export {listAdvertsController}