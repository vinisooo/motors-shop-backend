import { Request, Response } from "express";
import { createCommentService } from "../../services/comments/createComments.service";

const createCommentController = async (req:Request, res:Response) => {

    const {postId} = req.params
    const user = req.loggedUser.id
    const comment = await createCommentService(req.body, postId, user)
    return res.status(200).json(comment)
}

export { createCommentController }