import express from 'express'
import OrderController from '../controllers/OrderController.js'

var OrderRouter = express.Router()

//存储新生成的订单
OrderRouter.post('/orders', OrderController.createOrder)

//获取单条订单信息
OrderRouter.get('/order-detail', OrderController.getOrderDetail)

//修改订单状态state
OrderRouter.patch('/order-state-update', OrderController.updateOrderState)

//给付款的订单添加付款时间
OrderRouter.patch('/order-payTime-update', OrderController.updateOrderPayTime)

//删除订单
OrderRouter.delete('/orders', OrderController.deleteOrder)

//home页根据订单状态获取orderList
OrderRouter.get('/orderlist', OrderController.getOrderList)

//管理员，订单管理页获取orderList
OrderRouter.get('/orderlist-for-manage', OrderController.getOrderListForManage)

export default OrderRouter
