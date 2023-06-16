import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import 'dotenv/config'


class AppError extends Error{
    statusCode: number;
    message: string;

    constructor(message: string, statusCode: number){
        super()
        this.message = message
        this.statusCode = statusCode
    }
}

const handleError = (err: Error, req: Request, res: Response, _:NextFunction) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            details: err.message
        })
    }

    if(err instanceof ZodError){
        return res.status(400).json({
            details: err.flatten().fieldErrors
        })
    }

    else if(process.env.NODE_ENV!='prod'){
        console.log(err)
    }

    return res.status(500).json({
        details: "Internal Server Error"
    })
}

export { AppError, handleError }