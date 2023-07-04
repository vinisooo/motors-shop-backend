import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

//This middleware must be used after checking if advertisement exists and validating Token
const isAdvertisementOwnerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const advertisement = req.foundById;
    const loggedUser = req.loggedUser;

    if(advertisement.user.id != loggedUser.id){
        throw new AppError("You do not have permission to manage this advertisement", 401);        
    }

    return next();
}

export { isAdvertisementOwnerMiddleware }