import express from 'express'
import UserController from '../controllers/UserController.js'

var UserRouter = express.Router()

//登录
UserRouter.post('/login', UserController.login)

//注册
UserRouter.post('/register', UserController.register)

//增减用户余额
UserRouter.patch('/user-assets-update', UserController.updateUserAssets)

//home获取单用户信息
UserRouter.get('/user', UserController.getUser)

//管理员获取普通用户信息,超级管理员获取管理员信息
UserRouter.get('/users', UserController.getUsers)

//更新用户账号状态
UserRouter.patch('/user-state-update', UserController.updateUserState)

//永久删除用户
UserRouter.delete('/user', UserController.deleteUser)

export default UserRouter
