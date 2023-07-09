import { Request, Response } from "express";
import updateUserService from "../../services/user/updateUser.service";

const updateUserController = async (req: Request, res: Response) => {
    const userId = req.loggedUser.id
    const dataToUpdate = req.body
    const updatedUser = await updateUserService(dataToUpdate, userId)

    return res.send(updatedUser)
}

export default updateUserController