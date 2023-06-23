import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { TUser, TUserRes, TUserUpdateReq } from "../../interfaces/users.interfaces"
import { userResSchema } from "../../schemas/users.schema"

const updateUserService = async (data: TUserUpdateReq, userId: string): Promise<TUserRes> => {
    const userRepository: TUser = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
        where: {
            id: userId
        }
    })

    if (!user) {
        throw new AppError("Invalid id", 404)
    }

    const updatedUserObj = {
        name: data.name? data.name : user.name,
        email: data.email? data.email : user.email,
        cpf: data.cpf? data.cpf : user.cpf,
        phone: data.phone? data.phone : user.phone,
        birthdate: data.birthdate? data.birthdate : user.birthdate,
        description: data.description? data.description : user.description
    }

    await userRepository.update(
        userId, updatedUserObj
    )

    const updatedUser = await userRepository.findOne({
        where: {
            id: userId
        },
        relations: {
            address: true
        }
    })

    return userResSchema.parse(updatedUser) as TUserRes
}

export default updateUserService