import { Request, Response } from "express";
import { registerUserService } from "../../services/user/register.services";

const registerUserController = async (req: Request, res: Response) => {
    const user = await registerUserService(req.body);
    return res.status(201).json(user);
}

export { registerUserController }