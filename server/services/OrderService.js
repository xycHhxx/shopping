import OrderModel from '../models/OrderModel.js'

const OrderService = {
  createOrder: async ({ sourceUserId, sourceUserName, hotelName, roomName, roomId, checkInDate, checkOutDate, roomNum, resident, tel, sum, createTime, state }) => {
    return OrderModel.create({
      sourceUserId,
      sourceUserName,
      hotelName,
      roomName,
      roomId,
      checkInDate,
      checkOutDate,
      roomNum,
      resident,
      tel,
      sum,
      createTime,
      state
    })
  },
  getOrderDetail: async ({ order_id }) => {
    return OrderModel.find({ _id: order_id }).populate('sourceUserId', { assets: 1 }).populate('roomId', { stock: 1 })
  },
  updateOrderState: async ({ order_id, newState }) => {
    return OrderModel.updateOne({ _id: order_id }, { $set: { state: newState } })
  },
  updateOrderPayTime: async ({ order_id, payTime }) => {
    return OrderModel.updateOne({ _id: order_id }, { $set: { payTime: payTime } })
  },
  deleteOrder: async ({ order_id }) => {
    return OrderModel.deleteOne({ _id: order_id })
  },
  getAllOrders: async ({ page, limit, currentUserId }) => {
    return OrderModel.find({ sourceUserId: currentUserId })
      .skip((page - 1) * limit)
      .limit(limit)
  },
  getStateOrders: async ({ page, limit, orderState, currentUserId }) => {
    return OrderModel.find({ sourceUserId: currentUserId, state: orderState })
      .skip((page - 1) * limit)
      .limit(limit)
  },
  getAllOrdersForManage: async ({ page, limit }) => {
    return OrderModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
  },
  getStateOrdersForManage: async ({ page, limit, orderState }) => {
    return OrderModel.find({ state: orderState })
      .skip((page - 1) * limit)
      .limit(limit)
  }
}

export default OrderService
