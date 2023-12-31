import {z} from 'zod'
import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { compare } from "bcryptjs";
import { AppError } from "../../errors";
import  Jwt  from "jsonwebtoken";
import { TUserLogin } from '../../interfaces/users.interfaces';

const secretKey=process.env.SECRET_KEY!

const loginService = async (data:TUserLogin): Promise<string> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    const userFind = await userRepository.findOneBy({
        email: data.email
    })

    if(!userFind) {
        throw new AppError('user email or password invalid', 400)
    }  
    
    const passwordIsValid = await compare(data.password, userFind.password)
    
    if(!passwordIsValid) {
        throw new AppError('user email or password invalid', 400)
    } 

    const token: string = Jwt.sign (
        {

        },
        secretKey,
        {
            expiresIn: "2h" ,
            subject: userFind.id.toString()
        }
    )        

    return token
}

export { loginService }