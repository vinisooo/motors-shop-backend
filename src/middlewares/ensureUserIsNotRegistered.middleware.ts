import { Request, Response, NextFunction } from "express"
import { Repository } from "typeorm"
import { User } from "../entities/user.entity"
import { AppDataSource } from "../data-source"
import { AppError } from "../errors"

const ensureUserIsNotRegisteredMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    
    const userData = req.body;

    const foundByEmail = await userRepository.findOne({
        where:{
            email: userData.email,
        }
    }); 
    const foundByCpf = await userRepository.findOne({
        where:{
            cpf: userData.cpf,
        }
    }); 

    if(foundByEmail){
        throw new AppError(`Email ${userData.email} is already in use`, 409)
    }
    if(foundByCpf){
        throw new AppError(`CPF ${userData.cpf} is already in use`, 409)
    }

    return next();
}

export { ensureUserIsNotRegisteredMiddleware }