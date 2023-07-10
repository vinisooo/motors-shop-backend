import { Request, Response } from "express";
import deleteUserService from "../../services/user/deleteUser.service";

const deleteUserController = async (req: Request, res: Response) => {
    const userId: string = req.loggedUser.id
    await deleteUserService(userId)

    return res.status(204).send("User deleted")
}

export default deleteUserController