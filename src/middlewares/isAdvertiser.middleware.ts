import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const isAdvertiserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const isAdvertiser = req.loggedUser.isAdvertiser;

    if(!isAdvertiser) {
        throw new AppError("You do not have permission to manage or create advertisements", 401);
    }

    return next();
}

export { isAdvertiserMiddleware }