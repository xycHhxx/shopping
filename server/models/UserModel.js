import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserType = {
  username: String,
  password: String,
  email: String,
  role: Number, //0:超级管理员,1:管理员,2:消费者
  assets: Number,
  userState: Boolean
}

//user==>users集合
const UserModel = mongoose.model('user', new Schema(UserType, { versionKey: false }))

export default UserModel
