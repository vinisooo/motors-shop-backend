import { AppError } from "../../errors"
import { randomUUID } from "node:crypto"
import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { emailService } from "../../utils/sendEmail.utils";




const sendEmailResetPassword = async (email: string) => {
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
        where: {email}
    })

    if(!user){
        throw new AppError("user not found", 404)
    }

    const resetToken = randomUUID()
  

    await userRepository.update(
        user.id,
       { reset_password: resetToken}
    )


    const resetPasswordTemplate = emailService.resetPasswordTemplate(user.name, email, resetToken)

    await emailService.sendEmail(resetPasswordTemplate)

}


export {sendEmailResetPassword}