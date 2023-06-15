import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Advertisement } from "../../entities/advertisement.entity";
import { AppError } from "../../errors";
import { TAdvertisement, TAdvertisementListRes } from "../../interfaces/advertisements.interfaces";
import { TUser } from "../../interfaces/users.interfaces";
import { advertisementListResSchema } from "../../schemas/advertisements.schema";


const listUserAdvertsService = async (userId: string): Promise<Advertisement[]> => {

    const advertsRepository: TAdvertisement = AppDataSource.getRepository(Advertisement)

    const adverts: Advertisement[]  = await advertsRepository.find({
        where:{
            user:{
                id: userId
            }
        },
        relations: {
            user: true,
        }
    })

    // const validatedAdvertisements = advertisementListResSchema.parse(adverts)

    return adverts
}

export { listUserAdvertsService }