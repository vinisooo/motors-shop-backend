import { Repository } from "typeorm";
import { z } from "zod";
import { Advertisement } from "../entities/advertisement.entity";
import { advertisementListPaginatedResSchema, advertisementListResSchema, advertisementListUserPaginatedResSchema, advertisementReqSchema, advertisementResSchema, advertisementUpdateReqSchema } from "../schemas/advertisements.schema";

export type TAdvertisement = Repository<Advertisement>
export type TAdvertisementReq = z.infer<typeof advertisementReqSchema>
export type TAdvertisementRes = z.infer<typeof advertisementResSchema>
export type TAdvertisementUpdateReq = z.infer<typeof advertisementUpdateReqSchema>
export type TAdvertisementListRes = z.infer<typeof advertisementListResSchema>

//paginated

export type TListAdvertisementUserPaginated=z.infer<typeof advertisementListUserPaginatedResSchema>
export type TListAdvertisementPaginated=z.infer<typeof advertisementListPaginatedResSchema>