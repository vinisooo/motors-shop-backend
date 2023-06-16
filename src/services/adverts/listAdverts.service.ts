import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Advertisement } from "../../entities/advertisement.entity";
import { AppError } from "../../errors";
import { TAdvertisement, TAdvertisementListRes } from "../../interfaces/advertisements.interfaces";
import { TUser } from "../../interfaces/users.interfaces";
import { advertisementListResSchema } from "../../schemas/advertisements.schema";



const listAdvertsService = async (): Promise<TAdvertisementListRes> => {

    
    const advertsRepository: TAdvertisement = AppDataSource.getRepository(Advertisement)
    const usersRepository: TUser = AppDataSource.getRepository(User)

    // const user: User | null = await usersRepository.findOneBy({
    //     id: userId
    // })

    // if (!user) {
    //     throw new AppError("User not found", 404)
    // }

    const adverts: Advertisement[]  = await advertsRepository.find()

    const validatedAdvertisements = advertisementListResSchema.parse(adverts)

    return validatedAdvertisements
}

export { listAdvertsService}