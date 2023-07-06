import { z } from "zod";

export const galleryAdvertisementSchema = z.object({
    id: z.string(),
    imageUrl: z.string(),
});

export const galleryAdvertisementReqSchema = z.array(galleryAdvertisementSchema.omit({
    id: true
}));

export const galleryAdvertisementListSchema = galleryAdvertisementSchema.array();