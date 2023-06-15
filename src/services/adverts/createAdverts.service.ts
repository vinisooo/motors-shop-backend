import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { TAdvertisementReq, TAdvertisementRes } from "../../interfaces/advertisements.interfaces";
import { advertisementSchema } from "../../schemas/advertisements.schema";



const createAdvertisementService = async (data: TAdvertisementReq, userId: string): Promise<Advertisement> => {
    
    const advertisementRepository: Repository<Advertisement> = AppDataSource.getRepository(Advertisement)
    const usersRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await usersRepository.findOneBy({
        id: userId
    })

    if (!user) {
        throw new AppError("User not found", 404)
    }

    const advertisement: Advertisement = advertisementRepository.create({
        ...data,
        user
    })

    await advertisementRepository.save(advertisement)

    // const validatedAdvertisement = advertisementSchema.parse(advertisement)

    return advertisement
}

export { createAdvertisementService }