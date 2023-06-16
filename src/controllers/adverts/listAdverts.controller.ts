import { Request, Response } from "express";
import { listAdvertsService } from "../../services/adverts/listAdverts.service";



const listAdvertsController = async (req: Request, res: Response) => {

    //const userId = req.loggedUser.id
    const adverts  = await listAdvertsService('94783724-aba0-4d2c-b31e-7c8e68d86b73')

    return res.json(adverts)
}

export {listAdvertsController}