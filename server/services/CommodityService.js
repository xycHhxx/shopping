import CommodityModel from '../models/CommodityModel.js'

const CommodityService = {
  getCommodity: async () => {
    return CommodityModel.find({}, { _id: 1, img: 1, hotelname: 1, score: 1, commentNum: 1, prePrice: 1, price: 1 })
  },
  getCommodityDetail: async ({ current_hotel_id }) => {
    return CommodityModel.find({ _id: current_hotel_id }, { _id: 1, img: 1, hotelname: 1, score: 1, commentNum: 1, prePrice: 1, price: 1, location: 1 })
  },
  updateCommentNum: async ({ sourceHotelId, newCommentNum }) => {
    return CommodityModel.updateOne({ _id: sourceHotelId }, { $set: { commentNum: newCommentNum } })
  }
}

export default CommodityService
