import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Advertisement } from "./advertisement.entity";

@Entity("gallery_announce")
class Gallery_Announce {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => Advertisement)
    advertisement: Advertisement
}

export {Gallery_Announce}