/*入口*/

import express from 'express'
import './config/db.config.js'
import JWT from './util/JWT.js'

//导入自定义路由模块
import UserRouter from './routes/UserRouter.js'
import CommodityRouter from './routes/CommodityRouter.js'
import RoomRouter from './routes/RoomRouter.js'
import OrderRouter from './routes/OrderRouter.js'
import CommentRouter from './routes/CommentRouter.js'

const app = express()

//解决跨域
import cors from 'cors'
app.use(cors())

//配置解析post参数
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//统一更新token
app.use((req, res, next) => {
  //排除login和register
  if (req.url === '/login' || req.url === '/register') {
    next()
    return
  }

  const token = req.headers.authorization.split(' ')[1]
  if (token) {
    const payload = JWT.verify(token)
    if (payload) {
      const newToken = JWT.generate(
        {
          _id: payload._id,
          username: payload.username
        },
        '1d'
      )
      // console.log(newToken)
      res.header('Authorization', newToken)
      res.header('Access-Control-Expose-Headers', '*')
      next()
    } else {
      res.status(401).send('登录已过期！')
    }
  } else {
    res.send('token获取失败!')
  }
})

//注册user模型相关操作的路由模块
app.use(UserRouter)

//注册commodity模型相关操作的路由模块
app.use(CommodityRouter)

//注册room模型相关操作的路由模块
app.use(RoomRouter)

//注册order模型相关操作的路由模块
app.use(OrderRouter)

//注册comment模型相关操作的路由模块
app.use(CommentRouter)

//错误中间件
app.use((req, res) => {
  res.status(404).send('页面访问失败！')
})

app.listen(8000, () => {
  console.log('server start!')
})
