import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Advertisement } from "./advertisement.entity";

@Entity("comments")
class Comment {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 255})
    comment: string

    @CreateDateColumn({type: "date"})
    created_at: Date

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => Advertisement)
    advertisement: Advertisement


}

export {Comment}