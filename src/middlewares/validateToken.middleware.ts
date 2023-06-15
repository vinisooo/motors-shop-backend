import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError } from '../errors';

const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = req.headers.authorization;
    if(!token){
        throw new AppError("Bearer token is missing", 401);
    }

    token = token?.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY!, (err: jwt.VerifyErrors | null, decoded: any) => {
        if(err){
            throw new AppError(err.message, 401);
        }
        req.loggedUser = {
            is_advertiser: decoded.is_advertiser,
            id: decoded.sub
        }
    })
    return next();
}

export { validateTokenMiddleware }