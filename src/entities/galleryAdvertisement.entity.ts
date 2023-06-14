import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Advertisement } from "./advertisement.entity";

@Entity("gallery_advertisement")
class GalleryAdvertisement {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => Advertisement)
    advertisement: Advertisement
}

export {GalleryAdvertisement}