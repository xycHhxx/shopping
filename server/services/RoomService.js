import RoomModel from '../models/RoomModel.js'

const RoomService = {
  getRoomList: async ({ page, limit, hotelId }) => {
    return RoomModel.find({ sourceHotel: hotelId })
      .skip((page - 1) * limit)
      .limit(limit)
  },
  getRoomWithHotel: async ({ room_id }) => {
    return RoomModel.find({ _id: room_id }).populate('sourceHotel', { hotelname: 1, location: 1, commentNum: 1 })
  },
  updateRoomStock: async ({ roomId, newStock }) => {
    return RoomModel.updateOne({ _id: roomId }, { $set: { stock: newStock } })
  }
}

export default RoomService
