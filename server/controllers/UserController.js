import UserService from '../services/UserService.js'
import JWT from '../util/JWT.js'

const UserController = {
  login: async (req, res) => {
    const data = await UserService.login(req.body)
    // console.log(data)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      //进一步验证账户状态
      if (data[0].userState) {
        //生成token
        const token = JWT.generate(
          {
            _id: data[0]._id,
            username: data[0].username
          },
          '1d'
        )
        //设置响应头
        res.header('Authorization', token)
        res.header('Access-Control-Expose-Headers', '*')

        res.send(data)
      } else {
        res.send({
          AcitionType: 'ERROR'
        })
      }
    }
  },
  register: async (req, res) => {
    // console.log(req.body)
    var data = {}
    if (req.body.role === 1) {
      data = await UserService.registerManager(req.body)
    } else {
      data = await UserService.registerConsumer(req.body)
    }

    // console.log(data)
    try {
      res.send(data)
    } catch (err) {
      res.status(404).send('注册失败！')
    }
  },
  updateUserAssets: async (req, res) => {
    const data = await UserService.updateUserAssets(req.body)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  },
  getUser: async (req, res) => {
    const data = await UserService.getUser(req.query)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  },
  getUsers: async (req, res) => {
    var data = []
    if (req.query.role === '0') {
      data = await UserService.getManagers()
    } else {
      data = await UserService.getConsumers()
    }

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  },
  updateUserState: async (req, res) => {
    const data = await UserService.updateUserState(req.body)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  },
  deleteUser: async (req, res) => {
    const data = await UserService.deleteUser(req.query)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  }
}

export default UserController
