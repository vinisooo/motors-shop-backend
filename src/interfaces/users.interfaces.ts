import { Repository } from "typeorm";
import { z } from "zod";
import { User } from "../entities/user.entity";
import { userReqSchema, userResSchema, userSchemaResetPassword, userUpdateReqSchema } from "../schemas/users.schema";
import { userLoginSchema } from "../schemas/login.schemas";


export type TUser = Repository<User>;
export type TUserReq = z.infer<typeof userReqSchema>;
export type TUserUpdateReq = z.infer<typeof userUpdateReqSchema>;
export type TUserRes = z.infer<typeof userResSchema>;
export type TUserUpdateReqPassword = z.infer<typeof userSchemaResetPassword>;

export type TUserLogin=z.infer<typeof userLoginSchema>;