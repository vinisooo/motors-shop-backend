import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { TAdvertisementReq, TAdvertisementRes} from "../../interfaces/advertisements.interfaces";
import { advertisementResSchema } from "../../schemas/advertisements.schema";
import { GalleryAdvertisement } from "../../entities/galleryAdvertisement.entity";


const createAdvertisementService = async (data: TAdvertisementReq,userId:string): /* Promise<TAdvertisementRes> */ Promise<any>=> {

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
        console.log('temos')
        galery.map((img)=>{
            const {imageUrl}=img
            const create= galleryRepository.save({
                imageUrl,
                advertisement: newAdvertise
            })
            console.log(create)
        })
    }
    else{
        console.log('ntnos')
    }
    return advertisementResSchema.parse(newAdvertise)

}

export { createAdvertisementService }
