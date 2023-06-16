import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { TAdvertisement,TAdvertisementRes } from "../../interfaces/advertisements.interfaces";
import { advertisementListResSchema, advertisementSchema } from "../../schemas/advertisements.schema";

const listAdvertsService = async (): Promise<any> => {

    const advertsRepository: TAdvertisement = AppDataSource.getRepository(Advertisement)

    const adverts: Advertisement[] = await advertsRepository.find({
        relations:{
            user:true
        }
    })

    return advertisementListResSchema.parse(adverts)
}

export { listAdvertsService}