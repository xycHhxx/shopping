import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CommentType = {
  sourceHotel: {
    type: mongoose.Schema.ObjectId,
    ref: 'commodity'
  },
  author: String,
  roomName: String,
  content: String,
  publishTime: String
}

//comment==>comments集合
const CommentModel = mongoose.model('comment', new Schema(CommentType, { versionKey: false }))

export default CommentModel
