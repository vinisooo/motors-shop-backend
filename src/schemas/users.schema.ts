import { z } from "zod";
import { addressReqSchema, addressSchema } from "./addresses.schema";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(60),
  email: z.string().email("Deve ser um email válido").max(60),
  password: z.string().max(150),
  cpf:z.string().min(11).max(11),
  phone: z.string(),
  birthdate: z.string(),
  profileImg: z.string().nullish().or(z.string().max(127)),
  isAdvertiser: z.boolean().optional(),
  address:addressReqSchema,
  description: z.string().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  reset_password: z.string().optional(),
})

export const userResSchema = userSchema.omit({
  password: true,
  cpf:true,
  reset_password: true,
  address:true
}).extend({
  address: addressSchema
})





export const userSchemaResetPassword = z.object({
  to: z.string(),
  subject: z.string(),
  text: z.string(),
})

export const userReqSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  reset_password: true
})

export const userUpdateReqSchema = userReqSchema.omit({
  password: true,
  address: true,
}).partial()


export const userAdvertisementResSchema = userResSchema.omit({
  address: true
})

export const addressUserResSchema = userSchema.omit({
  password: true,
  cpf:true,
  reset_password: true,
  address: true
})


