import { Repository } from "typeorm";
import { z } from "zod";
import { GalleryAdvertisement } from "../entities/galleryAdvertisement.entity";
import { galleryAdvertisementListSchema, galleryAdvertisementReqSchema, galleryAdvertisementSchema } from "../schemas/galleryAdvertisement.schema";

export type TGalleryAdvertisement = Repository<GalleryAdvertisement>
export type TGalleryAdvertisementReq = z.infer<typeof galleryAdvertisementReqSchema>
export type TGalleryAdvertisementRes = z.infer<typeof galleryAdvertisementSchema>
export type TGalleryAdvertisementListRes = z.infer<typeof galleryAdvertisementListSchema>