import { query } from 'express'
import CommodityService from '../services/CommodityService.js'

const CommodityController = {
  getCommodity: async (req, res) => {
    // console.log(req.query)

    const data = await CommodityService.getCommodity()

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  },
  getCommodityDetail: async (req, res) => {
    const data = await CommodityService.getCommodityDetail(req.query)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  },
  updateCommentNum: async (req, res) => {
    const data = await CommodityService.updateCommentNum(req.body)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  }
}

export default CommodityController
