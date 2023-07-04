import { AppDataSource } from "../../data-source"
import { Advertisement } from "../../entities/advertisement.entity"
import { Comment } from "../../entities/comment.entity"
import { commentPostSchema } from "../../schemas/comments.schema"
import { getTimeSince } from "../../utils/timeAddedComment.utils"


const getPostCommentsService=async(postId:string)=>{

    const commentRepository= AppDataSource.getRepository(Comment)
    const postRepository= AppDataSource.getRepository(Advertisement)

    const post= await postRepository.findOneBy({
        id:postId
    })

    let postComments= await commentRepository.find({
        where:{
            advertisement:{
                id:postId
            }
        },
        relations:{
            user:true
        }
    })

    postComments = postComments.map((comment) => {
        return {
            ...comment,
            timeSince: getTimeSince(comment.createdAt)
        }
    })

    const comments={
        post,
        postComments
    }

    return commentPostSchema.parse(comments)
}

export {getPostCommentsService}