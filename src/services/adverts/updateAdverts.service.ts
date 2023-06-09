import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { AppError } from "../../errors";



const updateAnnouncementService = async (announcementId: string) => {
    
    const announcementRepository: Repository<Advertisement> = AppDataSource.getRepository(Advertisement)
    const announcement: Advertisement | null = await announcementRepository.findOneBy({ id: announcementId })

    if (!announcement) {
        throw new AppError("Announcement not found", 404)
    }

    const newAnnouncement = announcementRepository.create({
        ...announcement,
        // ...data
    })

    await announcementRepository.save(newAnnouncement)


    return newAnnouncement

}

export { updateAnnouncementService}