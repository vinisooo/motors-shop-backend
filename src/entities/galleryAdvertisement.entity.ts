import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Advertisement } from "./advertisement.entity";

@Entity("galleryAdvertisement")
class GalleryAdvertisement {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    imageUrl: string

    @ManyToOne(() => Advertisement)
    advertisement: Advertisement
}

export {GalleryAdvertisement}