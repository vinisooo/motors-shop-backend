import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
class Address {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 8})
    zipCode: string

    @Column({length:2})
    state: string

    @Column({length:25})
    city: string

    @Column({length: 40})
    street: string

    @Column()
    number: string

    @Column({length: 128, nullable:true})
    complement: string
}

export {Address}