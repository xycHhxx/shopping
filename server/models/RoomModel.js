import mongoose from 'mongoose'

const Schema = mongoose.Schema

const RoomType = {
  img: String,
  roomName: String,
  descriptions: String,
  breakfast: String,
  prePrice: Number,
  price: Number,
  sourceHotel: {
    type: mongoose.Schema.ObjectId,
    ref: 'commodity'
  },
  stock: Number
}

//room==>rooms集合
const RoomModel = mongoose.model('room', new Schema(RoomType, { versionKey: false }))

export default RoomModel
