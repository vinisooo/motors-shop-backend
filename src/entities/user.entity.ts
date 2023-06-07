import {Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"
import { Address } from "./address.entity"

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
    profile_img: string

    @Column()
    is_advertiser: boolean

    @Column({type: 'text' , nullable: true})
    description?: string | undefined | null

    @CreateDateColumn({type: "date"})
    created_at: Date

    @UpdateDateColumn({type: "date"})
    updated_at: Date

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address
}

export {User}