import { Request, Response } from "express";
import { getLoggedUserService } from "../../services/user/getLoggedUser.services";

const getLoggedUserController = async(req: Request, res: Response) => {
    const loggedUser = req.loggedUser;
    const loggedUserData = await getLoggedUserService('5611a676-2dcc-4f36-becc-c9af080ae2ae');
    return res.status(200).json(loggedUserData);
}

export { getLoggedUserController }