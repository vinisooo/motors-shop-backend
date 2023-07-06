import { Repository } from "typeorm";
import { z } from "zod";
import { Address } from "../entities/address.entity";
import { addressReqSchema, addressSchema, addressUpdateReqSchema } from "../schemas/addresses.schema";

export type TAddress = Repository<Address>;
export type TAddressReq = z.infer<typeof addressReqSchema>;
export type TAddressRes = z.infer<typeof addressSchema>;
export type TAddressUpdateReq = z.infer<typeof addressUpdateReqSchema>;