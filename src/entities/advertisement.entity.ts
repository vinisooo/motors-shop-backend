import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";
import { GalleryAdvertisement } from "./galleryAdvertisement.entity";

@Entity("advertisements")
class Advertisement {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 60})
    brand: string

    @Column({length: 120})
    model: string

    @Column({type: "integer"})
    year: number

    @Column({length: 20})
    fuel: string

    @Column({length: 20})
    color: string

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    quilometers: number

    @Column({ type: 'decimal', precision: 9, scale: 2, default: 0 })
    price: number

    @Column({length: 150})
    coverImage: string

    @Column({type: 'text' , nullable: true})
    description?: string | undefined | null

    @Column({default: true})
    isAvailable: boolean

    @Column({default: false})
    fipeDeal: boolean

    @ManyToOne(()=> User)
    user: User

    @OneToMany(() => Comment, comments => comments.advertisement)
    comments: Comment[]

    @OneToMany(() => GalleryAdvertisement, galleryAdvertisement => galleryAdvertisement.advertisement)
    galleryAdvertisement: GalleryAdvertisement[] | undefined

    @CreateDateColumn({type:'timestamp'})
    createdAt: Date | string

    @UpdateDateColumn({type:'timestamp',nullable:true})
    updatedAt: Date | string | null

}

export {Advertisement}