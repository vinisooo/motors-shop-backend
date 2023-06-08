import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";



const createAnnouncementService = async (userId: string) => {
    
    const announcementRepository: Repository<Advertisement> = AppDataSource.getRepository(Advertisement)
    const usersRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await usersRepository.findOneBy({
        id: userId
    })

    if (!user) {
        throw new AppError("User not found", 404)
    }

    const Announcement: Advertisement = announcementRepository.create({
       // ...data,
        user
    })

    await announcementRepository.save(Announcement)

    return Announcement
}

export { createAnnouncementService }