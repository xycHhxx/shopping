import RoomService from '../services/RoomService.js'

const RoomController = {
  getRoomList: async (req, res) => {
    // console.log(req.query)

    const data = await RoomService.getRoomList(req.query)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  },
  getRoomWithHotel: async (req, res) => {
    const data = await RoomService.getRoomWithHotel(req.query)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  },
  updateRoomStock: async (req, res) => {
    const data = await RoomService.updateRoomStock(req.body)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  }
}

export default RoomController
