import { z } from "zod";
import { userSchema } from "./user.schemas";

const userRegisterSchema = userSchema.omit({id: true, created_at: true, updated_at: true});

type tUserRegister = z.infer<typeof userRegisterSchema>;

export { userRegisterSchema, tUserRegister }