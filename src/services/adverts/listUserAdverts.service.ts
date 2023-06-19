import { number } from "zod";
import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { TAdvertisement, TAdvertisementListRes, TListAdvertisementUserPaginated } from "../../interfaces/advertisements.interfaces";
import { advertisementListResSchema } from "../../schemas/advertisements.schema";
import { baseUrl } from "../../server";


const listUserAdvertsService = async (userId:string,queries:any): Promise<TListAdvertisementUserPaginated> => {

    const {perPage,order}=queries
    const {brand,color,fuel,year}=queries
    const page=queries.page && Number(queries.page)>0 && Number(queries.page) || 1

    const advertsRepository: TAdvertisement = AppDataSource.getRepository(Advertisement)

    const adverts: Advertisement[]  = await advertsRepository.find({
        where:{
            user:{
                id: userId
            },
            brand,
            color,
            fuel,
            year
        },
        relations: {
            user: true,
        },
        skip: perPage && page?  perPage * (page-1) : 5 * (page-1),
        take: perPage  || 5,
        order:{ 
            createdAt: ['asc','ASC','desc','DESC'].includes(order) ?  order : 'asc'
        }
    })

    var url=`${baseUrl}/users/${userId}/adverts`
    for (let [key, value] of Object.entries(queries)) {
        if(key!='page'){
            url+=`?${key}=${value}`
        }
    }

    const paginated:TListAdvertisementUserPaginated={
        prev: page > 1 ? `${url}?page=${page-1}` : 'null',
        page:`${url}?page=${page}`,
        next:`${url}?page=${page+1}`,
        count:adverts.length,
        adverts: advertisementListResSchema.parse(adverts)
    }

    return paginated
}

export { listUserAdvertsService}