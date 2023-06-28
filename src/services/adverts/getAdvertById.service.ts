import { AppDataSource } from "../../data-source"
import { Advertisement } from "../../entities/advertisement.entity"
import { userAdvertisementResSchema, userResSchema } from "../../schemas/users.schema"


const getAdvertByIdService = async(advertisementId: string) => {
    const advertsRepository = AppDataSource.getRepository(Advertisement)

    const advertisement = await advertsRepository.findOne({
        where: {
            id: advertisementId
        },
        relations: {
            comments: true,
            user: true,
            galleryAdvertisement: true
        }
    }) 
    const serializedUser = userAdvertisementResSchema.parse(advertisement?.user)
    return {...advertisement, user:serializedUser}
}

export {getAdvertByIdService}
