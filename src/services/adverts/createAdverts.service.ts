import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { TAdvertisementReqSchema, TAdvertisementSchema, advertisementSchema,} from "../../schemas/advertisements.schema";
import { GalleryAdvertisement } from "../../entities/galleryAdvertisement.entity";


const createAdvertisementService = async (data: TAdvertisementReqSchema,userId:string): Promise<TAdvertisementSchema>=> {


    console.log(data)

    const galery= data.galleryAdvertisement
    delete data.galleryAdvertisement
    
    const advertisementRepository: Repository<Advertisement> = AppDataSource.getRepository(Advertisement)
    const usersRepository: Repository<User> = AppDataSource.getRepository(User)
    const galleryRepository: Repository<GalleryAdvertisement> = AppDataSource.getRepository(GalleryAdvertisement)

    const user: User | null = await usersRepository.findOneBy({
            id: userId
    })

    if (!user) {
         throw new AppError("User not found", 404)
    }

    if(!user.isAdvertiser){
        throw new AppError("user is not advertisement",400)
    }

    
    const advertisement = advertisementRepository.create({
        user,
        ...data
    })
    
    const newAdvertise=await advertisementRepository.save(advertisement)
    
    if(galery && galery.length>0){
        galery.map((img: { imageUrl: string })=>{
            const {imageUrl}=img
            const create= galleryRepository.save({
                imageUrl,
                advertisement: newAdvertise
            })
            console.log(create)
        })
    }

    return advertisementSchema.parse(newAdvertise)
}

export { createAdvertisementService }
