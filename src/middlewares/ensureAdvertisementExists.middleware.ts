import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Advertisement } from "../entities/advertisement.entity";
import { AppError } from "../errors";

export const ensureAdvertisementExistsMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const advertisementRepository = AppDataSource.getRepository(Advertisement);

    const advertisementId: string = req.params.id

    const advertisement: Advertisement | null = await advertisementRepository.findOne({
        where: {
            id: advertisementId,
        },
        relations: {
            user: true
        }
    })

    if(!advertisement){
        throw new AppError("Advertisement not found", 404);
    }
    
    req.foundById = advertisement;
    return next();
}
