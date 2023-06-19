import { skip } from "node:test";
import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { TAdvertisement} from "../../interfaces/advertisements.interfaces";
import { advertisementListResSchema} from "../../schemas/advertisements.schema";

const listAdvertsService = async (queries:any): Promise<any> => {

    const {page,perPage,order}=queries
    const {color,brand,fuel,year}=queries

    const advertsRepository: TAdvertisement = AppDataSource.getRepository(Advertisement)

    const adverts: Advertisement[] = await advertsRepository.find({
        where:{
            brand,  
            color,
            fuel, 
            year,
        },
        relations:{
            user:true
        },
        skip: perPage && page ? perPage * (page-1) : 5 * 0 ,
        take: perPage || 5,
        order:{
            createdAt: ['asc','ASC','desc','DESC'].includes(order) ?  order : "asc"
        }
    })

    return advertisementListResSchema.parse(adverts)
}

export { listAdvertsService}