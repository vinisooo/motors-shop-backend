import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { AppError } from "../../errors";
import { advertisementSchema } from "../../schemas/advertisements.schema";
import { TAdvertisementSchema } from "../../interfaces/advertisements.interfaces";
import { GalleryAdvertisement } from "../../entities/galleryAdvertisement.entity";



const updateAdvertisementService = async (data: any, advertisementId: string): Promise<TAdvertisementSchema> => {
    console.log(data)
    const advertisementRepository: Repository<Advertisement> = AppDataSource.getRepository(Advertisement)
    const advertisement: Advertisement | null = await advertisementRepository.findOneBy({
        id: advertisementId 
    })
    const galleryAdvertisementRepository: Repository<GalleryAdvertisement> = AppDataSource.getRepository(GalleryAdvertisement)

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
        }, 
        relations: {
            user: true,
            comments: true,
            galleryAdvertisement: true
        }
    })

    const validatedAdvertisement = advertisementSchema.parse(updatedAdvertisement)

    if (data.galleryAdvertisement) {
        const galleryImages: {"imageUrl":string, "id"?:string | null}[] = [];
    
        await galleryAdvertisementRepository.delete({
          advertisement: {
            id: advertisement.id,
          },
        });
    
        for (const img of data.galleryAdvertisement) {
          const galleryImage = galleryAdvertisementRepository.create({
            ...img,
            advertisement: advertisement,
          });
    
          await galleryAdvertisementRepository.save(galleryImage);
          const imageObject = {
            imageUrl: img.imageUrl,
            id: null
          }
          galleryImages.push(imageObject)
        }
    
        return { ...validatedAdvertisement, galleryAdvertisement: galleryImages as GalleryAdvertisement[] };
      }

    return validatedAdvertisement

}

export { updateAdvertisementService }