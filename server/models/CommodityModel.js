import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CommodityType = {
  img: String,
  hotelname: String,
  score: String,
  commentNum: Number,
  prePrice: Number,
  price: Number,
  location: String
}

//commodity==>commodities集合
const CommodityModel = mongoose.model('commodity', new Schema(CommodityType, { versionKey: false }))

export default CommodityModel
