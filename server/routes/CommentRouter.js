import express from 'express'
import CommentController from '../controllers/CommentController.js'

var CommentRouter = express.Router()

//创建评论
CommentRouter.post('/comments', CommentController.createComment)

//获取评论列表
CommentRouter.get('/commentlist', CommentController.getCommentList)

export default CommentRouter
