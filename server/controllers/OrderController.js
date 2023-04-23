import OrderService from '../services/OrderService.js'

const OrderController = {
  createOrder: async (req, res) => {
    const data = await OrderService.createOrder(req.body)

    // console.log(data)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data._id)
    }
  },
  getOrderDetail: async (req, res) => {
    const data = await OrderService.getOrderDetail(req.query)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  },
  updateOrderState: async (req, res) => {
    const data = await OrderService.updateOrderState(req.body)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  },
  updateOrderPayTime: async (req, res) => {
    const data = await OrderService.updateOrderPayTime(req.body)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  },
  deleteOrder: async (req, res) => {
    const data = await OrderService.deleteOrder(req.query)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  },
  getOrderList: async (req, res) => {
    // console.log(req.query)

    var data = []
    if (req.query.orderState === '6') {
      data = await OrderService.getAllOrders(req.query)
    } else {
      data = await OrderService.getStateOrders(req.query)
    }

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      // console.log(data)

      res.send(data)
    }
  },
  getOrderListForManage: async (req, res) => {
    var data = []
    if (req.query.orderState === '6') {
      data = await OrderService.getAllOrdersForManage(req.query)
    } else {
      data = await OrderService.getStateOrdersForManage(req.query)
    }

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      // console.log(data)

      res.send(data)
    }
  }
}

export default OrderController
