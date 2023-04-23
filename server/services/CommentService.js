import CommentModel from '../models/CommentModel.js'

const CommentService = {
  createComment: async ({ sourceHotel, author, roomName, content, publishTime }) => {
    return CommentModel.create({ sourceHotel, author, roomName, content, publishTime })
  },
  getCommentList: async ({ page, limit, hotelId }) => {
    return CommentModel.find({ sourceHotel: hotelId })
      .skip((page - 1) * limit)
      .limit(limit)
  }
}
export default CommentService
