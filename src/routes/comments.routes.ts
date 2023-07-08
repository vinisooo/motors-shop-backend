import { Router } from "express"
import { createCommentController } from "../controllers/comments/createCommentController"
import { validateTokenMiddleware } from "../middlewares/validateToken.middleware"
import { validateDataMiddleware } from "../middlewares/validateData.middleware"
import { commentReqSchema } from "../schemas/comments.schema"
import { getAllCommentsController } from "../controllers/comments/getAllCommentsController"
import { getPostCommentsController } from "../controllers/comments/getPostCommentsController"
import { ensureCommentExistsMiddleware } from "../middlewares/ensureCommentExists.middleware"
import { isCommentOwnerMiddleware } from "../middlewares/isCommentOwner.middleware"
import { deleteCommentController } from "../controllers/comments/deleteCommentController"

const commentsRouter=Router()

commentsRouter.post('/:postId',
                    validateTokenMiddleware,
                    validateDataMiddleware(commentReqSchema),
                    createCommentController
                  )
commentsRouter.get("/",
                    validateTokenMiddleware,
                    getAllCommentsController
                  )
commentsRouter.get("/:postId",
                    validateTokenMiddleware,
                    getPostCommentsController
                  )
commentsRouter.delete("/:commentId",
                    validateTokenMiddleware,
                    ensureCommentExistsMiddleware,
                    isCommentOwnerMiddleware,
                    deleteCommentController
                  )


export { commentsRouter }