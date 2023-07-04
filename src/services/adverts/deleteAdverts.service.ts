import { AppDataSource } from "../../data-source"
import { Advertisement } from "../../entities/advertisement.entity"
import { GalleryAdvertisement } from "../../entities/galleryAdvertisement.entity"
import { AppError } from "../../errors"


const deleteAdvertisementService = async (advertisementId: string): Promise<void> => {

    const advertisementRepository = AppDataSource.getRepository(Advertisement)
    const galleryRepository= AppDataSource.getRepository(GalleryAdvertisement)


    const gallery=await galleryRepository.find({
        where:{
            advertisement:{
                id:advertisementId
            }
        }
    })

    gallery &&
    gallery.map((img)=>{
        galleryRepository.remove(img)
    })

    const advertisement: Advertisement | null = await advertisementRepository.findOneBy({ id: advertisementId })

    if (!advertisement) {
        throw new AppError("Advertisement not found", 404)
    }

    await advertisementRepository.remove(advertisement)
}

export { deleteAdvertisementService }