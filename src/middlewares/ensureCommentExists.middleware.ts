import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Comment } from "../entities/comment.entity";
import { AppError } from "../errors";

const ensureCommentExistsMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const commentsRepository = AppDataSource.getRepository(Comment);

    const comment: Comment | null = await commentsRepository.findOne({
        where: {
            id: req.params.commentId
        },
        relations: {
            user: true
        }
    })

    if(!comment){
        throw new AppError("Comment not found", 404);
    }

    req.foundById = comment;
    return next();
}

export {ensureCommentExistsMiddleware}