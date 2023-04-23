import React, { useEffect, useState } from 'react'
import { useNavigate, useMatch } from 'react-router-dom'

import styles from './css/Pay.module.css'
import axios from 'axios'

/*antd*/
import { Space, Image, Button, Modal } from 'antd'
import { TransactionOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

export default function Pay() {
  //拿到新生成的订单的id
  const match = useMatch('/shopping/pay/:orderId')
  const order_id = match.params.orderId

  const [dataSource, setDataSource] = useState({})
  const [userAssets, setUserAssets] = useState(0)

  useEffect(() => {
    axios.get('/order-detail', { params: { order_id } }).then(res => {
      // console.log(res.data)
      setDataSource(res.data[0])

      //联表查询拿到登录用户的当前余额、当前房间的当前库存
      setUserAssets(res.data[0].sourceUserId.assets)
    })
  }, [])

  //立即支付点击事件处理函数
  const navigate = useNavigate()
  const handlePay = () => {
    //比较用户当前余额和订单总额的大小，余额不足提示，中断支付
    if (userAssets >= parseInt(dataSource.sum)) {
      //支付完：1.扣用户余额 2.跳转支付成功页，传订单id
      const newAssets = userAssets - parseInt(dataSource.sum)

      axios.patch('/user-assets-update', { sourceUserId: dataSource.sourceUserId, newAssets: newAssets }).then(res => {
        // console.log(res.data)
      })

      //改order的state为已付款1,添加付款时间
      axios.patch('/order-state-update', { order_id: order_id, newState: 1 })

      const payTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
      axios.patch('/order-payTime-update', { order_id: order_id, payTime: payTime })

      navigate(`/shopping/pay-succ/${order_id}`)
    } else {
      //余额不足,待处理！！
      // console.log('余额不足!')

      //弹出确认去充值Modal
      setIsModalOpen(true)
    }
  }

  //取消支付
  const handleCancelPay = () => {
    //跳转当前新生成的订单详情页
    navigate(`/shopping/order-detail/${order_id}`)
  }

  /*antd*/
  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
    navigate(`/my/topup/${dataSource.sourceUserId._id}`)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={styles.biggestContainer}>
      {/* header */}
      <div className={styles.header}>
        <Space>
          <span className={styles.saveText}>安全支付</span>
          <div className={styles.left}>
            <TransactionOutlined />
            <span style={{ marginLeft: '5px' }}>无障碍</span>
          </div>
        </Space>
      </div>

      {/* infContainer */}
      <div className={styles.infContainer}>
        <Space size={0}>
          <div className={styles.priceContainer}>
            <span>订单金额：</span>
            <span className={styles.price}>{`¥${dataSource.sum}`}</span>
          </div>

          <div className={styles.orderInf}>
            <div className={styles.hotelName}>{dataSource.hotelName}</div>
            <div>
              <span>{dataSource.roomName}</span>
              <span>{`${dataSource.roomNum}间`}</span>
              <span style={{ marginLeft: '10px' }}>{`入住：${dataSource.checkInDate}`}</span>
              <span style={{ marginLeft: '10px' }}>{`退房：${dataSource.checkOutDate}`}</span>
              <span style={{ marginLeft: '10px' }}>入住1晚</span>
            </div>
          </div>
        </Space>
      </div>

      {/* payContainer */}
      <div className={styles.payContainer}>
        <Image width={100} src="https://gw.alipayobjects.com/mdn/rms_3dad6b/afts/img/A*RumeRK2mkhsAAAAAAAAAAAAAARQnAQ" fallback="https://img0.baidu.com/it/u=2570981049,4015989895&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=400" />
        <div className={styles.canOrPayContainer}>
          <div className={styles.cancel} onClick={() => handleCancelPay()}>
            取消支付?
          </div>
          <Button className={styles.payButton} onClick={() => handlePay()}>
            立即支付
          </Button>
        </div>
      </div>

      {/* 余额不足时弹出 */}
      <Modal
        title="账户余额不足，请充值！"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            去充值
          </Button>
        ]}
      >
        <p>{`当前余额为 ¥${userAssets}`}</p>
      </Modal>
    </div>
  )
}

/*
1.订单state改为已付款
2.显示支付成功界面，有组件
同时该界面上要有两个点击按钮，“查看订单”、“返回首页”
*/
