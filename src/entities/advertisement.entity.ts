import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";
import { Gallery_Announce } from "./gallery_announce.entity";

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

    @Column({ type: 'decimal', precision: 6, scale: 2, default: 0 })
    quilometers: number

    @Column({ type: 'decimal', precision: 9, scale: 2, default: 0 })
    price: number

    @Column({length: 150})
    cover_img: string

    @Column({type: 'text' , nullable: true})
    description?: string | undefined | null

    @Column({default: true})
    is_available: boolean

    @ManyToOne(()=> User)
    user: User

    @OneToMany(() => Comment, comments => comments.advertisement)
    comments: Comment[]

    @OneToMany(() => Gallery_Announce, gallery_announces => gallery_announces.advertisement)
    gallery_announces: Gallery_Announce[]
}

export {Advertisement}