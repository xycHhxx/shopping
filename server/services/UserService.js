import UserModel from '../models/UserModel.js'

const UserService = {
  login: async ({ username, password }) => {
    return UserModel.find({ username, password })
  },
  registerManager: async ({ username, password, email, role }) => {
    return UserModel.create({
      username,
      password,
      email,
      role,
      assets: 0,
      userState: false
    })
  },
  registerConsumer: async ({ username, password, email, role }) => {
    return UserModel.create({
      username,
      password,
      email,
      role,
      assets: 0,
      userState: true
    })
  },
  updateUserAssets: async ({ sourceUserId, newAssets }) => {
    return UserModel.updateOne({ _id: sourceUserId }, { $set: { assets: newAssets } })
  },
  getUser: async ({ currentUserId }) => {
    return UserModel.find({ _id: currentUserId })
  },
  getManagers: async () => {
    return UserModel.find({ role: 1 })
  },
  getConsumers: async () => {
    return UserModel.find({ role: 2 })
  },
  updateUserState: async ({ _id, userState }) => {
    return UserModel.updateOne({ _id }, { $set: { userState } })
  },
  deleteUser: async ({ _id }) => {
    return UserModel.deleteOne({ _id })
  }
}

export default UserService
