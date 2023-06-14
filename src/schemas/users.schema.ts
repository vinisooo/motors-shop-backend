import { z } from "zod";
import { addressReqSchema } from "./addresses.schema";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(60),
  email: z.string().email("Deve ser um email válido").max(60),
  password: z.string().max(150),
  cpf: z.string().min(11).max(11),
  phone: z.string(),
  birthdate: z.string(),
  profileImg: z.string().max(127),
  isAdvertiser: z.boolean(),
  address: z.object({
    id: z.string(),
    zipCode: z.string().max(8),
    state: z.string().max(2),
    city: z.string().max(25),
    street: z.string().max(40),
    number: z.number(),
    complement: z.string().max(128)
  }),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const userReqSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  address: addressReqSchema
})

export const userUpdateReqSchema = userReqSchema.omit({
  password: true,
  address: true,
})

export const userResSchema = userSchema.omit({
  password: true,
})
