import { AppDataSource } from "../../data-source"
import { Advertisement } from "../../entities/advertisement.entity"
import { Comment } from "../../entities/comment.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { TCommentReqSchema, commentPostSchema, commentSchema} from "../../schemas/comments.schema"


const createCommentService=async(body:TCommentReqSchema,postId:string,userId:string)=>{

    const commentRepository=AppDataSource.getRepository(Comment)
    const advertiserRepository=AppDataSource.getRepository(Advertisement)
    const userRepository=AppDataSource.getRepository(User)

    const user= await userRepository.findOneBy({id:userId})
    const advertisement= await advertiserRepository.findOneBy({id:postId})

    if(!user || !advertisement){
        throw new AppError("user or advert not exists",400)
    }

    const comment={
        comment: body.comment
        ,user
        ,advertisement
    }
    
    const newComment= await commentRepository.save(comment)
    const commentParse= commentSchema.parse(newComment)

    return commentParse
}

export {createCommentService}