import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Advertisement } from "../../entities/advertisement.entity";
import { AppError } from "../../errors";



const listAdvertsService = async (userId: string)=> {

    
    const advertsRepository: Repository<Advertisement> = AppDataSource.getRepository(Advertisement)
    const usersRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await usersRepository.findOneBy({
        id: userId
    })

    if (!user) {
        throw new AppError("User not found", 404)
    }

    const adverts: Advertisement[]  = await advertsRepository.find({
        // where: {
        //     user: user
        // }
    })

    return adverts
}

export { listAdvertsService}