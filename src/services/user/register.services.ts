import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";
import { Repository } from "typeorm";

const registerUserService = async(data: User) => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);
    
    const addressData: Address = data.address;

    const address = addressRepository.create(addressData);
    await addressRepository.save(address);

    const user = userRepository.create({...data, address: address});
    await userRepository.save(user);

    return user;
}

export { registerUserService }