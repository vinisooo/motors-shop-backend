import { Advertisement } from "../../entities/advertisement.entity";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";
import { Comment } from "../../entities/comment.entity";

declare global {
    namespace Express {
        interface Request {
            foundById: Advertisement | User | Address | Comment,
        }
    }
}