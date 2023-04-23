import express from 'express'
import RoomController from '../controllers/RoomController.js'

var RoomRouter = express.Router()

//请求房间列表
RoomRouter.get('/roomlist', RoomController.getRoomList)

//order页请求房间+关联酒店信息
RoomRouter.get('/room-with-hotel', RoomController.getRoomWithHotel)

//增减房间库存
RoomRouter.patch('/room-stock-update', RoomController.updateRoomStock)

export default RoomRouter
