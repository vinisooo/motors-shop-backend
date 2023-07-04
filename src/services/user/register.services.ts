import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";
import { Repository } from "typeorm";
import { userResSchema} from "../../schemas/users.schema";

const registerUserService = async(data: User) => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);
    
    const addressData: Address = data.address;

    const address = addressRepository.create(addressData);
    const newAddress=await addressRepository.save(address);

    const user = userRepository.create({...data, address: newAddress});
    const newUser=await userRepository.save(user);

    return userResSchema.parse(newUser);
}

export { registerUserService }