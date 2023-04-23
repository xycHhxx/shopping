import express from 'express'
import CommodityController from '../controllers/CommodityController.js'

var CommodityRouter = express.Router()

//获取商品信息，即酒店基本信息
CommodityRouter.get('/commodity', CommodityController.getCommodity)

//获取酒店详情
CommodityRouter.get('/commodity-detail', CommodityController.getCommodityDetail)

//更新评论条数
CommodityRouter.patch('/comment-num-update', CommodityController.updateCommentNum)

export default CommodityRouter
