import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const isCommentOwnerMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    if(req.loggedUser.id !== req.foundById.user.id){
        throw new AppError("You do not have permission to manage this comment",401);
    }

    return next();
}

export {isCommentOwnerMiddleware}