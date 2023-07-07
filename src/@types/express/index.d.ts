import { Advertisement } from "../../entities/advertisement.entity";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";
import { Comment } from "../../entities/comment.entity";
import { GalleryAdvertisement } from "../../entities/galleryAdvertisement.entity";

declare global {
    namespace Express {
        interface Request {
            foundById: Comment | Address | User | Advertisement | GalleryAdvertisement,
            loggedUser: {isAdvertiser: boolean, id: string}
        }
    }
}