import { Request, Response } from "express";
import { listUserAdvertsService} from "../../services/adverts/listUserAdverts.service";

const listUserAdvertsController = async (req: Request, res: Response) => {

    const userId = req.params.id
    const adverts  = await listUserAdvertsService(userId,req.query)

    return res.json(adverts)
}

export {listUserAdvertsController}
