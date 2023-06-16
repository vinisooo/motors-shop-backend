import { Request, Response } from "express";
import { listUserAdvertsService } from "../../services/adverts/listAdverts.service";


const listUserAdvertsController = async (req: Request, res: Response) => {

    const userId = req.params.id
    const adverts  = await listUserAdvertsService(userId)

    return res.json(adverts)
}

export {listUserAdvertsController}