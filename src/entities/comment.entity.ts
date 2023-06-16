import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Advertisement } from "./advertisement.entity";

@Entity("comments")
class Comment {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 255})
    comment: string

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => Advertisement)
    advertisement: Advertisement


}

export {Comment}