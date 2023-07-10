import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { TUser } from "../../interfaces/users.interfaces"

const deleteUserService = async (userId: string): Promise<void> => {
    const userRepository: TUser = AppDataSource.getRepository(User)
    const userToDelete = await userRepository.findOne({
        where: {
            id: userId
        }
    })

    if (!userToDelete) {
        throw new AppError("User not found", 404)
    }

    await userRepository.delete({
        id: userId
    })
}

export default deleteUserService