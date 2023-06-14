import { Repository } from "typeorm";
import { z } from "zod";
import { Advertisement } from "../entities/advertisement.entity";
import { advertisementListResSchema, advertisementReqSchema, advertisementSchema, advertisementUpdateReqSchema } from "../schemas/advertisements.schema";

export type TAdvertisement = Repository<Advertisement>
export type TAdvertisementReq = z.infer<typeof advertisementReqSchema>
export type TAdvertisementRes = z.infer<typeof advertisementSchema>
export type TAdvertisementUpdateReq = z.infer<typeof advertisementUpdateReqSchema>
export type TAdvertisementListRes = z.infer<typeof advertisementListResSchema>