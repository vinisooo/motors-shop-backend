import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";
import { Repository } from "typeorm";
import { tAddressRegisterSchema } from "../../schemas/address.schemas";
import { noPasswordUserSchema } from "../../schemas/user.schemas";

const registerUserService = async(data: User) => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);
    
    const addressData: tAddressRegisterSchema = data.address;

    const address = addressRepository.create(addressData as Address);
    await addressRepository.save(address);

    const user = userRepository.create({...data, address: address});
    await userRepository.save(user);

    return user;
}

export { registerUserService }