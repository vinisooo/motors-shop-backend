import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export const isAdvertiserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const isAdvertiser = req.loggedUser.is_advertiser;

    if(!isAdvertiser) {
        throw new AppError("You do not have permission to manage or create advertisements", 401);
    }

    return next();
}
