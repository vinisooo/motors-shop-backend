import { z } from "zod";
import { commentSchema } from "./comments.schema";
import { galleryAdvertisementListSchema, galleryAdvertisementReqSchema } from "./galleryAdvertisement.schema";
import { userResSchema } from "./users.schema";

export const advertisementSchema = z.object({
  id: z.string(),
  brand: z.string().max(60),
  model: z.string().max(120),
  year: z.number(),
  fuel: z.string().max(20),
  color: z.string().max(20),
  quilometers: z.number(),
  price: z.number(),
  coverImage: z.string().max(150),
  description: z.string(),
  isAvailable: z.boolean(),
  user: userResSchema.omit({address:true}),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  comments: z.array(commentSchema.omit({
    advertisement: true,
  })).optional(),
  galleryAdvertisement: galleryAdvertisementListSchema.optional(),
})

export const advertisementReqSchema = advertisementSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isAvailable: true,
  user: true,
  comments: true,
  galleryAdvertisement:true
}).extend({
  galleryAnnounce: z.array(galleryAdvertisementReqSchema).optional()
})

export const advertisementUpdateReqSchema = advertisementReqSchema.partial()

export const advertisementResSchema = advertisementSchema.omit({
  price: true,
  quilometers: true
}).extend({
  price: z.string(),
  quilometers: z.string()
})


export const advertisementUserListResSchema = z.array(advertisementResSchema.omit({
  user:true
}))


export const advertisementListResSchema=z.array(advertisementResSchema)

export const advertisementListUserPaginatedResSchema=z.object({
  page:z.string(),
  next:z.string(),
  prev:z.string(),
  count:z.number(),
  adverts: advertisementUserListResSchema
})

export const advertisementListPaginatedResSchema=z.object({
  page:z.string(),
  next:z.string(),
  prev:z.string(),
  count:z.number(),
  adverts: advertisementListResSchema
})