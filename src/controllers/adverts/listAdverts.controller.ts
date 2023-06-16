import { Request, Response } from "express";
import { listAdvertsService } from "../../services/adverts/listAdverts.service";



const listAdvertsController = async (req: Request, res: Response) => {

    // const userId = req.loggedUser.id
    const adverts  = await listAdvertsService()

    return res.json(adverts)
}

export {listAdvertsController}