import { hashSync } from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";



const resetPassword = async (password: string, resetToken: string) => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
        where: {
            reset_password: resetToken
        }
    })

    if(!user){
        throw new AppError("user not found", 404)
    }


    await userRepository.update(
        user.id,
        {
            password: hashSync(password, 10),
            reset_password: null
        }
    )


}

export {resetPassword}