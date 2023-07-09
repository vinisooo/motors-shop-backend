import { Request, Response } from "express";
import { sendEmailResetPassword } from "../../services/user/sendEmailResetPassword.service";
import { resetPassword } from "../../services/user/resetPassword.service";


const sendResetEmailPassword = async (req: Request, res: Response) => {
    const { email } = req.body

    await sendEmailResetPassword(email)
    return res.json({message: "token send"})
      
}


const resetPasswordUser= async(req: Request, res: Response)=>{
    const { password } = req.body
    const { token } = req.params

    await resetPassword(password, token)
    
    return res.json({message: "password change with sucess"})
}


export { sendResetEmailPassword, resetPasswordUser }