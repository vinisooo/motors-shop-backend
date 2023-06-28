import {z} from "zod";
import { advertisementSchema } from "./advertisements.schema";

export const commentSchema = z.object({
  id: z.string(),
  comment: z.string().max(255),
  createdAt: z.date(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    profileImg: z.string().nullable(),
  }),
  advertisement: z.object({
    id: z.string()
  })
})

const advert=z.object({
  id: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.number(),
  fuel: z.string(),
  color: z.string(),
  quilometers: z.string(),
  price: z.string(),
  coverImage: z.string(),
  description: z.string(),
  isAvailable: z.boolean(),
  createdAt: z.string().or(z.date()),
})

export const commentPostSchema = z.object({
  post: advert,
  postComments: z.array(commentSchema.omit({advertisement:true}))
})

export const commentReqSchema = z.object({
  comment: z.string().max(255)
})

export const commentListResSchema = commentSchema.array()


export type TCommentReqSchema=z.infer<typeof commentReqSchema>