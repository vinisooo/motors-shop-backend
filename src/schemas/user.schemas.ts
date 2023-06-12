import { z } from "zod";
import { addressRegisterSchema } from "./address.schemas";

const userSchema =z.object({
    id: z.string(),
    name: z.string().max(60, "Username must have at least 60 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must have at least 6 characters"),
    cpf: z.string().max(11, "CPF must contain 11 characters").min(11, "your CPF must contain 11 characters"),
    phone: z.string().max(18, "Cellphone number must contain less than 18 characters"),
    birthdate: z.string(),
    profile_img: z.string().optional(),
    is_advertiser: z.boolean(),
    description: z.string().optional(),
    address: addressRegisterSchema,
    created_at: z.string(),
    updated_at: z.string(),
});

const userRegisterSchema = userSchema.omit({id: true, created_at: true, updated_at: true});
const noPasswordUserSchema = userSchema.omit({password: true})

type tUser = z.infer<typeof userSchema>;
type tUserRegister = z.infer<typeof userRegisterSchema>;

export { userSchema, tUser, tUserRegister, userRegisterSchema, noPasswordUserSchema }
