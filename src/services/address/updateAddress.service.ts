import { AppDataSource } from "../../data-source"
import { Address } from "../../entities/address.entity"
import { User } from "../../entities/user.entity";
import { addressUserResSchema } from "../../schemas/users.schema";

const updateAddressService = async(data: object, foundAddress: Address, loggedUserId: string) => {
    const addressRepository = AppDataSource.getRepository(Address);
    const userRepository = AppDataSource.getRepository(User)

    const address = addressRepository.create({
        ...foundAddress,
        ...data
    })

    const loggedUser = await userRepository.findOne({
        where:{
            id: loggedUserId
        }
    })

    await addressRepository.save(address)

    const serializedUser = addressUserResSchema.parse(loggedUser)

    return {...address, user: serializedUser}
}

export { updateAddressService }