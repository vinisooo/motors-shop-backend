import { z } from "zod";

export const addressSchema = z.object({
    id: z.string().uuid(),
    zipCode: z.string().length(8, "zipCode must have exactly 8 characters"),
    state: z.string().max(2),
    city: z.string().max(25),
    street: z.string().max(40),
    number: z.string(),
    complement: z.string().max(128).nullish(),
});

export const addressReqSchema = addressSchema.omit({
    id: true,
});

export const addressUpdateReqSchema = addressReqSchema.partial();