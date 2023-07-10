import { Request, Response } from "express";
import { getLoggedUserService } from "../../services/user/getLoggedUser.service";

const getLoggedUserController = async (req: Request, res: Response) => {
    const loggedUser = req.loggedUser;
    const loggedUserData = await getLoggedUserService(loggedUser.id);
    return res.status(200).json(loggedUserData);
}

export { getLoggedUserController }