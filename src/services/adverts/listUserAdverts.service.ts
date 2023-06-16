import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { TAdvertisement, TAdvertisementListRes } from "../../interfaces/advertisements.interfaces";
import { advertisementListResSchema } from "../../schemas/advertisements.schema";



const listUserAdvertsService = async (userId:string): Promise<TAdvertisementListRes> => {

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

    return advertisementListResSchema.parse(adverts)
}

export { listUserAdvertsService}