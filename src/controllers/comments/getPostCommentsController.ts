import { Request, Response } from "express"
import { getPostCommentsService } from "../../services/comments/getPostComments"


const getPostCommentsController=async(req:Request,res:Response)=>{

    const {postId}=req.params
    const postComments=await getPostCommentsService(postId)

    return res.status(200).json(postComments)

}

export {getPostCommentsController}