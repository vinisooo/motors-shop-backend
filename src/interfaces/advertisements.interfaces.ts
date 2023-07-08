import { z } from "zod"
import { advertisementListPaginatedResSchema, advertisementListResSchema, advertisementListUserPaginatedResSchema, advertisementReqSchema, advertisementSchema, advertisementUpdateReqSchema } from "../schemas/advertisements.schema"

export type TAdvertisementSchema=z.infer<typeof advertisementSchema>;
export type TAdvertisementReqSchema= z.infer<typeof advertisementReqSchema>;
export type TAdvertisementListResSchema= z.infer<typeof advertisementListResSchema>;
export type TAdvertisementUpdateReqSchema = z.infer<typeof advertisementUpdateReqSchema>;
export type TAdvertisementListPaginatedResSchema=z.infer <typeof advertisementListPaginatedResSchema>;
export type TAdvertisementListUserPaginatedResSchema=z.infer <typeof advertisementListUserPaginatedResSchema>;