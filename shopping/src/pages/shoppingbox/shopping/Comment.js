import React, { useEffect, useState } from 'react'
import { useNavigate, useMatch } from 'react-router-dom'

import styles from './css/Comment.module.css'

import axios from 'axios'

/*antd*/
import { Space, Button, Form, Input } from 'antd'
import { TransactionOutlined, SendOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
const { TextArea } = Input

export default function Comment() {
  //路由上拿到订单id；请求到订单信息，得到roomId；用roomId发get拿到酒店id，把酒店id存进comment
  //拿到新生成的订单的id
  const match = useMatch('/shopping/comment/:orderId')
  const order_id = match.params.orderId

  const [dataSource, setDataSource] = useState({})
  const [sourceHotelId, setSourceHotelId] = useState('')
  const [sourceHotelCommentNum, setSourceHotelCommentNum] = useState(0)

  useEffect(() => {
    axios.get('/order-detail', { params: { order_id } }).then(res => {
      setDataSource(res.data[0])

      //通过roomId拿到酒店id
      axios.get('/room-with-hotel', { params: { room_id: res.data[0].roomId } }).then(res => {
        // console.log(res.data[0].sourceHotel._id)
        setSourceHotelId(res.data[0].sourceHotel._id)
        setSourceHotelCommentNum(res.data[0].sourceHotel.commentNum)
      })
    })
  }, [])

  //发布评论
  const navigate = useNavigate()

  const onFinish = values => {
    // console.log(values)
    //post评论信息
    axios
      .post('/comments', {
        sourceHotel: sourceHotelId,
        author: dataSource.sourceUserName,
        roomName: dataSource.roomName,
        content: values.comment,
        publishTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
      .then(res => {
        axios.patch('/order-state-update', { order_id, newState: 3 })

        //更新酒店评论数量
        const newCommentNum = sourceHotelCommentNum + 1
        axios.patch('/comment-num-update', { sourceHotelId, newCommentNum })

        navigate(`/shopping/pay-succ/${order_id}`)
      })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={styles.biggestContainer}>
      {/* header */}
      <div className={styles.header}>
        <Space>
          <span className={styles.saveText}>商品评价</span>
          <div className={styles.left}>
            <TransactionOutlined />
            <span style={{ marginLeft: '5px' }}>良心点评</span>
          </div>
        </Space>
      </div>

      <Form
        name="basic"
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        style={{
          width: '100%'
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        {/* infContainer */}
        <div className={styles.infContainer}>
          <Space size={0}>
            <div className={styles.priceContainer}>
              <div className={styles.hotelName}>{dataSource.hotelName}</div>
              <div>
                <span>{dataSource.roomName}</span>
                <span>{`${dataSource.roomNum}间`}</span>
                <span style={{ marginLeft: '10px' }}>{`入住：${dataSource.checkInDate}`}</span>
                <span style={{ marginLeft: '10px' }}>{`退房：${dataSource.checkOutDate}`}</span>
                <span style={{ marginLeft: '10px' }}>入住1晚</span>
              </div>

              <div style={{ marginTop: 50 }}>
                <span>订单金额：</span>
                <span className={styles.price}>{`¥${dataSource.sum}`}</span>
              </div>
            </div>

            <div className={styles.commentContainer}>
              <Form.Item
                name="comment"
                label={<span style={{ fontSize: 16 }}>评论区：</span>}
                rules={[
                  {
                    required: true,
                    message: '请输入评价内容!'
                  }
                ]}
              >
                <TextArea rows={4} placeholder="请输入评价~" />
              </Form.Item>
            </div>
          </Space>
        </div>

        {/* publishContainer */}
        <div className={styles.payContainer}>
          <div className={styles.canOrPayContainer}>
            <Button className={styles.payButton} htmlType="submit" icon={<SendOutlined />}>
              发布
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}
