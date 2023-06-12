import { z } from "zod";

const addressSchema = z.object({
    id: z.string(),
    zip_code: z.string().max(8, "ZipCode must contain 8 characters").min(8, "ZipCode must contain 8 characters"),
    state: z.string().min(2, "State must contain 2 characters").max(2, "State must contain 2 characters"),
    city: z.string().max(25,"City must contain less than 25 characters"),
    street: z.string().max(40,"Street name must contain less than 40 characters"),
    number: z.string(),
    complement: z.string().max(128, "Complement must contain less than 128 characters").optional()
});
const addressRegisterSchema = addressSchema.omit({id: true});

type tAddressRegisterSchema = z.infer<typeof addressRegisterSchema>;
type tAddressSchema = z.infer<typeof addressSchema>;

export { addressSchema, tAddressRegisterSchema, tAddressSchema }