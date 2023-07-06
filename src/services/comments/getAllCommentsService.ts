import { AppDataSource } from "../../data-source"
import { Comment } from "../../entities/comment.entity"
import { commentListResSchema } from "../../schemas/comments.schema"

const getAllCommentsService = async () => {

    const commentsRepository = AppDataSource.getRepository(Comment)
    const allComments = await commentsRepository.find({
        relations: {
            user: true,
            advertisement: true
        }
    })

    const comments = commentListResSchema.parse(allComments)

    return comments
}

export { getAllCommentsService }