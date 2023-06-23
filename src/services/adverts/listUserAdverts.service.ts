import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Advertisement } from "../../entities/advertisement.entity";
import { TAdvertisement, TListAdvertisementUserPaginated } from "../../interfaces/advertisements.interfaces";
import { advertisementListResSchema} from "../../schemas/advertisements.schema";
import { baseUrl } from "../../server";
import { TUser } from "../../interfaces/users.interfaces";
import { User } from "../../entities/user.entity";
import { userResSchema } from "../../schemas/users.schema";

const listUserAdvertsService = async (userId:string,queries:any): Promise<TListAdvertisementUserPaginated> => {

    const {order}=queries
    const {brand,color,fuel,year}=queries
    const page=queries.page && Number(queries.page)>0 && Number(queries.page) || 1
    const perPage=queries.perPage && Number(queries.perPage)>0 && Number(queries.perPage) || 5

    const advertsRepository: TAdvertisement = AppDataSource.getRepository(Advertisement)
    const userRepository: Repository<User>= AppDataSource.getRepository(User)

    const user=await userRepository.findOneBy({
        id:userId
    })

    const allAdverts: Advertisement[]  = await advertsRepository.find({
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
        }
    })

    const maxPage=Math.ceil(allAdverts.length/perPage)

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
        prev: page > 1 ? `${url}?page=${page-1}` : null,
        page:`${url}?page=${page}`,
        next: page >= maxPage ? null : `${url}?page=${page+1}`,
        maxPage,
        count:adverts.length,
        data:{
            user: userResSchema.omit({address:true}).parse(user),
            adverts: advertisementListResSchema.parse(adverts)
        }
    }

    return paginated
}

export { listUserAdvertsService}