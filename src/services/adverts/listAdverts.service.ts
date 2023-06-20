import { skip } from "node:test";
import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { TAdvertisement, TListAdvertisementPaginated} from "../../interfaces/advertisements.interfaces";
import {advertisementListResSchema, advertisementResSchema} from "../../schemas/advertisements.schema";
import { baseUrl } from "../../server";

const listAdvertsService = async (queries:any): Promise<any> => {

    const {perPage,order}=queries
    const page=queries.page && Number(queries.page)>0 && Number(queries.page) || 1
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
        
        skip: perPage && page?  perPage * (page-1) : 5 * (page-1),
        take: perPage  || 5,
        order:{ 
            createdAt: ['asc','ASC','desc','DESC'].includes(order) ?  order : 'asc'
        }
    })

    var url=`${baseUrl}/adverts`
    for (let [key, value] of Object.entries(queries)) {
        if(key!='page'){
            url+=`?${key}=${value}`
        }
    }

    const paginated:TListAdvertisementPaginated={
        prev: page > 1 ? `${url}?page=${page-1}` : 'null',
        page:`${url}?page=${page}`,
        next:`${url}?page=${page+1}`,
        count:adverts.length,
        adverts: advertisementListResSchema.parse(adverts)
    }

    return paginated

}

export { listAdvertsService}