import { AppDataSource } from "../../data-source"
import { Advertisement } from "../../entities/advertisement.entity"
import { AppError } from "../../errors"
import { TAdvertisement } from "../../interfaces/advertisements.interfaces"


const deleteAdvertisementService = async (advertisementId: string): Promise<void> => {

    const advertisementRepository: TAdvertisement = AppDataSource.getRepository(Advertisement)
    const advertisement: Advertisement | null = await advertisementRepository.findOneBy({ id: advertisementId })

    if (!advertisement) {
        throw new AppError("Advertisement not found", 404)
    }

    await advertisementRepository.remove(advertisement)
}

export { deleteAdvertisementService }