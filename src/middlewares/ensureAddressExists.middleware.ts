import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { Address } from "../entities/address.entity";

const ensureAddressExistsMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const addressRepository = AppDataSource.getRepository(Address);

    const addressId: string = req.params.id

    const address: Address | null = await addressRepository.findOne({
        where: {
            id: addressId,
        }
    })

    if(!address){
        throw new AppError("Address not found", 404);
    }
    
    req.foundById = address;
    return next();
}

export { ensureAddressExistsMiddleware }