import { z } from "zod";

export const addressSchema = z.object({
  id: z.string().uuid(),
  zipCode: z.string().max(8),
  state: z.string().max(2),
  city: z.string().max(25),
  street: z.string().max(40),
  number: z.number(),
  complement: z.string().max(128),
  updatedAt: z.date(),
})

export const addressReqSchema = addressSchema.omit({
  id: true,
  updatedAt: true,
})

export const addressUpdateReqSchema = addressReqSchema.partial()