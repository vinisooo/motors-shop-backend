import { Repository } from "typeorm";
import { z } from "zod";
import { Comment } from "../entities/comment.entity";
import { commentListResSchema, commentReqSchema, commentSchema } from "../schemas/comments.schema";

export type TComment = Repository<Comment>
export type TCommentReq = z.infer<typeof commentReqSchema>
export type TCommentRes = z.infer<typeof commentSchema>
export type TCommentList = z.infer<typeof commentListResSchema>