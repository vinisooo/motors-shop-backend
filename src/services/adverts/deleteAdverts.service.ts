import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Advertisement } from "../../entities/advertisement.entity"
import { AppError } from "../../errors"


const deleteAnnouncementService = async (announcementId: string): Promise<void> => {

    const announcementRepository: Repository<Advertisement> = AppDataSource.getRepository(Advertisement)
    const announcement: Advertisement | null = await announcementRepository.findOneBy({ id: announcementId })

    if (!announcement) {
        throw new AppError("Announcement not found", 404)
    }

    await announcementRepository.remove(announcement)
}

export { deleteAnnouncementService }