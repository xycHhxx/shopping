import CommentService from '../services/CommentService.js'

const CommentController = {
  createComment: async (req, res) => {
    const data = await CommentService.createComment(req.body)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  },
  getCommentList: async (req, res) => {
    const data = await CommentService.getCommentList(req.query)

    if (data.length === 0) {
      res.send({
        AcitionType: 'ERROR'
      })
    } else {
      res.send(data)
    }
  }
}

export default CommentController
