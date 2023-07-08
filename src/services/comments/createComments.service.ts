import { AppDataSource } from "../../data-source"
import { Advertisement } from "../../entities/advertisement.entity"
import { Comment } from "../../entities/comment.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { TCommentReq } from "../../interfaces/comments.interfaces"
import { commentSchema } from "../../schemas/comments.schema"


const createCommentService = async (body: TCommentReq, postId: string, userId: string) => {

    const commentRepository = AppDataSource.getRepository(Comment)
    const advertiserRepository = AppDataSource.getRepository(Advertisement)
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        id:userId
    })

    const advertisement = await advertiserRepository.findOneBy({
        id:postId
    })

    if(!user || !advertisement) {
        throw new AppError("user or advert does not not exist", 400)
    }

    const comment = {
        comment: body.comment,
        user,
        advertisement
    }
    
    const newComment = await commentRepository.save(comment)
    const commentParse = commentSchema.parse(newComment)

    return commentParse
}

export { createCommentService }