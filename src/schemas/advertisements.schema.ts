import { z } from "zod";
import { commentSchema } from "./comments.schema";
import { galleryAdvertisementListSchema, galleryAdvertisementReqSchema } from "./galleryAdvertisement.schema";
import { userResSchema } from "./users.schema";
import { paginateSchema } from "./pagination.schema";

export const advertisementSchema = z.object({
    id: z.string(),
    brand: z.string().max(60),
    model: z.string().max(120),
    year: z.number(),
    fuel: z.string().max(20),
    color: z.string().max(20),
    quilometers: z.string(),
    price: z.string(),
    coverImage: z.string().max(150),
    description: z.string(),
    isAvailable: z.boolean().optional().default(true),
    user: userResSchema.omit({address:true}),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    fipeDeal: z.boolean().optional().default(false),
    comments: z.array(commentSchema.omit({
        advertisement: true,
    })).optional(),
    galleryAdvertisement: galleryAdvertisementListSchema.optional(),
});

export const advertisementReqSchema= advertisementSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    user: true,
    comments:true,
    price: true,
    quilometers: true,
    galleryAdvertisement:true,  
}).extend({
    price: z.number(),
    quilometers: z.number(),
    galleryAdvertisement:galleryAdvertisementReqSchema.optional(),
});


export const advertisementListResSchema = z.array(advertisementSchema.deepPartial())


export const advertisementListPaginatedResSchema = paginateSchema.extend({
    adverts: advertisementListResSchema
});

export const advertisementUserListResSchema = z.array(advertisementSchema.omit({
  user: true
}).deepPartial())

export const advertisementListUserPaginatedResSchema=advertisementListPaginatedResSchema.omit({  
    adverts:true
}).extend({
    data:z.object({
        user: userResSchema.omit({address:true}),
        adverts: advertisementUserListResSchema
    })
});

export const advertisementUpdateReqSchema = advertisementReqSchema.deepPartial();


