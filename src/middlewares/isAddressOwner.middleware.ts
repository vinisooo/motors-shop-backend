import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { AppError } from "../errors"
import { User } from "../entities/user.entity"

const isAddressOwnerMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User)
    const addressId = req.foundById.id
    const loggedUserId = req.loggedUser.id
    
    const isAddressOwner = await userRepository.findOne({
        where: {
            id: loggedUserId,
            address: {
                id: addressId
            }
        }
    })

    if(!isAddressOwner){
        throw new AppError("You do not have permission to access this address", 401)
    }

    return next()
}

export { isAddressOwnerMiddleware }