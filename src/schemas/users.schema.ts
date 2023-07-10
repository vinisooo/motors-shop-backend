import { z } from "zod";
import { addressReqSchema, addressSchema } from "./addresses.schema";

export const userSchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(60),
    email: z.string().email("Must be a valid email").max(60),
    password: z
        .string()
        .min(8, "Password must contain at least 8 characters")
        .max(60, "Passwsord must contain less than 60 characters")
        .regex(/^(?=.*\d)/, "Password must contain at least one numerical character")
        .regex(/^(?=.*[a-z])/, "Password must contain at least one upper case character")
        .regex(/^(?=.*[A-Z])/, "Password must contain at least one lower case character")
        .regex(/^(?=.*[?!*$&@#])/, "Password must contain at least one of the following characters: ?!*$&@#.")
        .regex(/^[0-9a-zA-Z?!*$&@#]{8,}$/, "Password must contain at least 8 characters"),
    cpf:z.string().length(11,"CPF must contain exactly 11 characters"),
    phone: z.string().length(11,"Phone must contain exactly 11 characters"),
    birthdate: z.string(),
    profileImg: z.string().nullish().or(z.string().max(127)),
    isAdvertiser: z.boolean().optional(),
    address:addressReqSchema,
    description: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    reset_password: z.string().optional(),
});

export const userResSchema = userSchema.omit({
    password: true,
    cpf:true,
    reset_password: true,
    address:true
}).extend({
    address: addressSchema
});

export const userSchemaResetPassword = z.object({
    to: z.string(),
    subject: z.string(),
    text: z.string(),
});

export const userReqSchema = userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    reset_password: true
});

export const userUpdateReqSchema = userReqSchema.omit({
    password: true,
    address: true,
}).partial();


export const userAdvertisementResSchema = userResSchema.omit({
    address: true
});

export const addressUserResSchema = userSchema.omit({
    password: true,
    cpf:true,
    reset_password: true,
    address: true
});