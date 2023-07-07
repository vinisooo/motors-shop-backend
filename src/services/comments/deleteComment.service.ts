import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities/comment.entity";

const deleteCommentService = async(commentId: string) => {
    const commentsRepository: Repository<Comment> = AppDataSource.getRepository(Comment);

    const comment = await commentsRepository.delete(commentId);

    return comment;
}

export {deleteCommentService}
