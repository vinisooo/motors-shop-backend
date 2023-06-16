import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { userResSchema } from "../../schemas/users.schema";

const getLoggedUserService = async(loggedUserId: string) => {
    const userRepository = AppDataSource.getRepository(User);

    const loggedUser = await userRepository.findOne({
        where: {
            id: loggedUserId,
        },
        relations: {
            address: true
        }
    })

    return userResSchema.parse(loggedUser);
}

export { getLoggedUserService }
