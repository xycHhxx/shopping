import React, { useEffect, useState } from 'react'
import { useNavigate, useMatch } from 'react-router-dom'

import styles from './css/PaySucc.module.css'

import axios from 'axios'

/*antd*/
import { Button, Result } from 'antd'

export default function PaySucc() {
  //拿到新生成的订单的id
  const match = useMatch('/shopping/pay-succ/:orderId')
  const order_id = match.params.orderId

  const [orderState, setOrderState] = useState(0)

  useEffect(() => {
    axios.get('/order-detail', { params: { order_id } }).then(res => {
      setOrderState(res.data[0].state)
    })
  }, [])

  //根据订单state(1,2,3,4,5)动态决定title
  const title = ['恭喜，支付成功！', '恭喜，订单确认成功！', '评论成功，订单已完成，感谢惠顾！', '订单取消成功，感谢惠顾！', '退款成功，感谢惠顾！']

  const navigate = useNavigate()
  //返回首页
  const handleBackShopping = () => {
    navigate('/shopping')
  }
  //去订单详情页
  const handleOrderDetail = () => {
    navigate(`/shopping/order-detail/${order_id}`)
  }
  //去评价
  const handleComment = () => {
    navigate(`/shopping/comment/${order_id}`)
  }

  return (
    <div className={styles.biggestContainer}>
      {orderState && orderState !== 2 ? (
        <Result
          status="success"
          title={title[orderState - 1]}
          extra={[
            <Button
              type="primary"
              key="commodities"
              onClick={() => {
                handleBackShopping()
              }}
            >
              返回首页
            </Button>,
            <Button key="order" style={{ marginLeft: '10px' }} onClick={() => handleOrderDetail()}>
              查看订单
            </Button>
          ]}
        />
      ) : (
        <Result
          status="success"
          title={title[orderState - 1]}
          extra={[
            <Button
              type="primary"
              key="commodities"
              onClick={() => {
                handleBackShopping()
              }}
            >
              返回首页
            </Button>,
            <Button key="order" style={{ marginLeft: '10px' }} onClick={() => handleComment()}>
              立即评价
            </Button>
          ]}
        />
      )}
    </div>
  )
}
