import {z} from 'zod'

const userLoginSchema=z.object({
    email:z.string().email(),
    password:z.string()
})

type tUserLogin=z.infer<typeof userLoginSchema>


export {userLoginSchema,tUserLogin}