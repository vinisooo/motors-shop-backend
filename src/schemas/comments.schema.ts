import { z } from "zod";

export const commentSchema = z.object({
  id: z.string(),
  comment: z.string().max(255),
  createdAt: z.date(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    profileImg: z.string(),
  }),
  advertisement: z.object({
    id: z.string()
  })
})

export const commentReqSchema = z.object({
  comment: z.string().max(255)
})

export const commentListResSchema = commentSchema.array()