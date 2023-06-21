import { createTransport } from "nodemailer";
import { AppError } from "../errors";
import Mailgen from "mailgen";
import { TUserUpdateReqPassword } from "../interfaces/users.interfaces";



class EmailService {
    async sendEmail({to,subject,text}:TUserUpdateReqPassword){

        const trasnporter = createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })

        await trasnporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html: text
        }).then(() => {
            console.log("Email send with sucess")
        }).catch((err) => {
            console.log(err)
            throw new AppError("Error sending email, try again later", 500)
        })

    }


    resetPasswordTemplate(userName:string, userEmail: string, resetToken: string){

        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Reset password',
                link: 'http://localhost:3001'        
               
            }
        });

        const email = {
            body: {
                name: userName,
                intro: 'You have received this email because a password reset request for your account was received.',
                action: {
                    instructions: 'Click the button below to reset your password:',
                    button: {
                        color: '#DC4D2F',
                        text: 'Reset your password',
                        link: `http://localhost:3001/resetPassword/${resetToken}`
                    }
                },
                outro: 'If you did not request a password reset, no further action is required on your part.'
            }
        };

        const emailBody = mailGenerator.generate(email)
        const emailTemplate = {
            to: userEmail,
            subject: "Reset password",
            text: emailBody
        }

        return emailTemplate
    }
}

const emailService = new EmailService()

export {emailService}