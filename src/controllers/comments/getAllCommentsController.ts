import { Request, Response } from "express";
import { getAllCommentsService } from "../../services/comments/getAllCommentsService";

const getAllCommentsController=async(req:Request,res:Response)=>{

    const allComments=await getAllCommentsService()

    return res.status(200).json(allComments)

}

export {getAllCommentsController}