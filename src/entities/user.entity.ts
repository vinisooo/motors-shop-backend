import {Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate} from "typeorm"
import { Address } from "./address.entity"
import { Comment } from "./comment.entity"
import { Advertisement } from "./advertisement.entity"
import { hashSync } from "bcryptjs"

@Entity("users")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 60})
    name: string

    @Column({length: 60, unique: true})
    email: string

    @Column({length: 150})
    password: string

    @Column({length: 11, unique: true})
    cpf: string

    @Column({length: 18})
    phone: string

    @Column({type: "date"})
    birthdate: Date

    @Column({length:127, nullable:true})
    profileImg: string

    @Column({default:false})
    isAdvertiser: boolean

    @Column({type: 'text' , nullable: true})
    description?: string | undefined | null

    @CreateDateColumn({type: "datetime"})
    createdAt: Date | string

    @UpdateDateColumn({type: "datetime"})
    updatedAt: Date | string

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address

    @OneToMany(() => Comment, comments => comments.user)
    comments: Comment[]

    @OneToMany(() => Advertisement, advertisements => advertisements.user)
    advertisements: Advertisement[]

    @BeforeInsert()
    @BeforeUpdate()
    encryptInsert()
    {
        this.password = hashSync(this.password, 10)
    }
}

export {User}