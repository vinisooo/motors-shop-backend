import { Request, Response } from "express";
import { deleteCommentService } from "../../services/comments/deleteCommentService";

const deleteCommentController = (req: Request, res: Response) => {
    const commentId = req.params.commentId;

    deleteCommentService(commentId);

    return res.status(204).json();
}

export {deleteCommentController}