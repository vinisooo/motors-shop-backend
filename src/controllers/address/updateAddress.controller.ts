import { Request, Response } from "express";
import { updateAddressService } from "../../services/address/updateAddress.service";

const updateAddressController = async(req: Request, res: Response) => {
    const address = await updateAddressService(req.body, req.foundById, req.loggedUser.id)
    
    return res.status(200).json(address)
}

export { updateAddressController }