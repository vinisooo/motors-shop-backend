import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { TAdvertisementListPaginatedResSchema, TAdvertisementListResSchema, advertisementListResSchema } from "../../schemas/advertisements.schema";
import { commentSchema } from "../../schemas/comments.schema";
import { userResSchema } from "../../schemas/users.schema";

import { baseUrl } from "../../server";
import { Between } from "typeorm";

const listAdvertsService = async (queries:any): Promise<TAdvertisementListPaginatedResSchema | TAdvertisementListResSchema> => {

    const {order}=queries
    const {color,brand,fuel,year,minKm,maxKm,minPrice,maxPrice, model}=queries
    const page=queries.page && Number(queries.page)>0 && Number(queries.page) || 1
    const perPage=queries.perPage && Number(queries.perPage)>0 && Number(queries.perPage) || 5

    const advertsRepository= AppDataSource.getRepository(Advertisement)

    const AllAdverts: Advertisement[] = await advertsRepository.find({
        where:{
            brand,  
            color,
            fuel, 
            year,
            model,
            quilometers: Between (minKm || 0 ,maxKm || 99999999),
            price: Between(minPrice || 0,maxPrice || 999999999)
        },
        relations:{
            user:true,
            comments:true,
            galleryAdvertisement:true
        },
    })

    if(perPage>=999){
        return advertisementListResSchema.parse(AllAdverts)
    }

    const maxPage=Math.ceil(AllAdverts.length/perPage)

    const adverts: Advertisement[] = await advertsRepository.find({
        where:{
            brand,  
            color,
            fuel, 
            year,
            model,
            quilometers: Between (minKm || 0 ,maxKm || 999999999),
            price: Between(minPrice || 0,maxPrice || 999999999)
        },
        relations:{
            user:true,
            galleryAdvertisement:true,
            comments: true
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

    const paginated={
        prev: page > 1 ? `${url}?page=${page-1}` : null,
        page:`${url}?page=${page}`,
        next: page >= maxPage ? null : `${url}?page=${page+1}`,
        maxPage,
        count:adverts.length,
        adverts: advertisementListResSchema.parse(adverts)
    }

    return paginated

}

export { listAdvertsService}