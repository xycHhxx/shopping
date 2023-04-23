import mongoose from 'mongoose'

const Schema = mongoose.Schema

const OrderType = {
  sourceUserId: {
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  },
  sourceUserName: String,
  hotelName: String,
  roomName: String,
  roomId: {
    type: mongoose.Schema.ObjectId,
    ref: 'room'
  },
  checkInDate: String,
  checkOutDate: String,
  roomNum: String,
  resident: String,
  tel: String,
  sum: Number,
  createTime: String,
  payTime: String,
  state: Number //0:待付款 1:待使用 2:待评价 3:已完成(已评价) 4:已取消 5:已退款
}

//order==>orders集合
const OrderModel = mongoose.model('order', new Schema(OrderType, { versionKey: false }))

export default OrderModel
