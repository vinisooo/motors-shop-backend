import { z } from "zod";

export const addressSchema = z.object({
  id: z.string().uuid(),
  zipCode: z.string().max(8),
  state: z.string().max(2),
  city: z.string().max(25),
  street: z.string().max(40),
  number: z.string(),
  complement: z.string().max(128).optional(),
})

export const addressReqSchema = addressSchema.omit({
  id: true,
})

export type TAddressReq = z.infer<typeof addressReqSchema>

export const addressUpdateReqSchema = addressReqSchema.partial()