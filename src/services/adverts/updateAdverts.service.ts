import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { AppError } from "../../errors";
import { TAdvertisementRes, TAdvertisementUpdateReq } from "../../interfaces/advertisements.interfaces";
import { advertisementResSchema, advertisementSchema } from "../../schemas/advertisements.schema";



const updateAdvertisementService = async (data: TAdvertisementUpdateReq, advertisementId: string): Promise<TAdvertisementRes> => {
    
    const advertisementRepository: Repository<Advertisement> = AppDataSource.getRepository(Advertisement)
    const advertisement: Advertisement | null = await advertisementRepository.findOneBy({ id: advertisementId })

    if (!advertisement) {
        throw new AppError("Advertisement not found", 404)
    }

    await advertisementRepository.update(
        advertisement.id,
        {
            brand: data.brand? data.brand : advertisement.brand,
            color: data.color? data.color : advertisement.color,
            model: data.model? data.model : advertisement.model,
            fuel: data.fuel? data.fuel : advertisement.fuel,
            price: data.price? data.price : advertisement.price,
            year: data.year? data.year : advertisement.year,
            coverImage: data.coverImage? data.coverImage : advertisement.coverImage,
            quilometers: data.quilometers? data.quilometers : advertisement.quilometers,
            description: data.description? data.description : advertisement.description,
        }
    )

    const updatedAdvertisement = await advertisementRepository.findOne({
        where: {
            id: advertisementId
        }, relations: {
            user: true,
            comments: true,
            galleryAdvertisement: true
        }
    })

    const validatedAdvertisement = advertisementResSchema.parse(updatedAdvertisement)


    return validatedAdvertisement

}

export { updateAdvertisementService}