import React, { useEffect, useState } from 'react'
import { useNavigate, useMatch } from 'react-router-dom'

import styles from './css/OrderDetail.module.css'

import axios from 'axios'

/*antd*/
import { Space, Button, Modal } from 'antd'
import { TransactionOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import dayjs from 'dayjs'
const { confirm } = Modal

export default function OrderDetail() {
  //拿到新生成的订单的id
  const match = useMatch('/shopping/order-detail/:orderId')
  const order_id = match.params.orderId

  const [dataSource, setDataSource] = useState({})
  const [userAssets, setUserAssets] = useState(0)
  const [roomStock, setRoomStock] = useState(0)

  useEffect(() => {
    axios.get('/order-detail', { params: { order_id } }).then(res => {
      // console.log(res.data)
      setDataSource(res.data[0])

      //联表查询拿到登录用户的当前余额、当前房间的当前库存
      setUserAssets(res.data[0].sourceUserId.assets)
      setRoomStock(res.data[0].roomId.stock)
    })
  }, [])

  //订单状态对应的描述
  const orderStateList = ['待付款', '待使用', '待评价', '已完成', '已取消', '已退款']

  /*事件处理函数*/
  const navigate = useNavigate()
  //3个可复用的更新操作的函数
  const updateUserAssets = (sourceUserId, newAssets) => {
    axios.patch('/user-assets-update', { sourceUserId, newAssets })
  }
  const updateRoomStock = roomId => {
    const newStock = roomStock + parseInt(dataSource.roomNum)
    axios.patch('/room-stock-update', { roomId, newStock })
  }
  const updateOrderState = (order_id, newState) => {
    axios.patch('/order-state-update', { order_id, newState })
  }

  //取消订单
  const handleCancelOrder = () => {
    //弹出对话框
    confirm({
      title: '确认取消订单吗?',
      icon: <ExclamationCircleFilled />,
      content: '订单取消后预订纪录将不会保留',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk() {
        //1.库存加回去 2.改订单state为4，不删 3.跳支付成功页，传订单id
        updateRoomStock(dataSource.roomId)

        updateOrderState(order_id, 4)

        navigate(`/shopping/pay-succ/${order_id}`)

        // console.log('确认')
      },
      onCancel() {
        // console.log('取消')
      }
    })
  }

  //继续付款
  const handlePay = () => {
    //比较用户当前余额和订单总额的大小，余额不足提示，中断支付
    if (userAssets >= parseInt(dataSource.sum)) {
      //支付完：1.扣用户余额 2.改order的state为1已付款 3.添加付款时间 4.跳转支付成功页，传订单id
      const newAssets = userAssets - parseInt(dataSource.sum)
      updateUserAssets(dataSource.sourceUserId, newAssets)

      updateOrderState(order_id, 1)

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

  //退款
  const handleRefund = () => {
    //弹出对话框
    confirm({
      title: '确认退款吗?',
      icon: <ExclamationCircleFilled />,
      content: '退款后预订纪录将不会保留',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk() {
        //1.库存加回去 2.加余额 3.改订单state为5，不删 4.跳PaySucc页，传订单id
        updateRoomStock(dataSource.roomId)

        const newAssets = userAssets + parseInt(dataSource.sum)
        updateUserAssets(dataSource.sourceUserId, newAssets)

        updateOrderState(order_id, 5)

        navigate(`/shopping/pay-succ/${order_id}`)
      },
      onCancel() {
        // console.log('取消')
      }
    })
  }

  //使用
  const handleUse = () => {
    //1.改订单state为2 2.跳PaySucc页，传订单id
    updateOrderState(order_id, 2)

    navigate(`/shopping/pay-succ/${order_id}`)
  }

  //评价
  const handleComment = () => {
    //1.跳评论页 2.评论完，在评论页改订单state为3 ；跳PaySucc页，传订单id
    navigate(`/shopping/comment/${order_id}`)
  }

  //删除订单
  const handleDelete = () => {
    //弹出对话框
    confirm({
      title: '确认删除订单吗?',
      icon: <ExclamationCircleFilled />,
      content: '订单删除后不可恢复',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk() {
        axios.delete('/orders', { params: { order_id: order_id } })
        //跳转专门的deleteSucc页
        navigate('/shopping/delete-succ')
      },
      onCancel() {
        // console.log('取消')
      }
    })
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
          <span className={styles.saveText}>订单详情</span>
          <div className={styles.left}>
            <TransactionOutlined />
            <span style={{ marginLeft: '5px' }}>{orderStateList[dataSource.state]}</span>
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

            <Space direction="vertical">
              <div>
                <span>{dataSource.roomName}</span>
                <span>{`${dataSource.roomNum}间`}</span>
                <span style={{ marginLeft: '10px' }}>{`入住：${dataSource.checkInDate}`}</span>
                <span style={{ marginLeft: '10px' }}>{`退房：${dataSource.checkOutDate}`}</span>
                <span style={{ marginLeft: '10px' }}>入住1晚</span>
              </div>

              <div>
                <span>{`住客姓名：${dataSource.resident}`}</span>
                <span style={{ marginLeft: '15px' }}>{`联系电话：${dataSource.tel}`}</span>
              </div>

              <span>{`下单用户：${dataSource.sourceUserName}`}</span>
              <span>{`创建时间：${dataSource.createTime}`}</span>
              {dataSource.state !== 0 && dataSource.state !== 4 && <span>{`付款时间：${dataSource.payTime}`}</span>}
            </Space>
          </div>
        </Space>
      </div>

      {/* payContainer */}
      <div className={styles.payContainer}>
        {/* 未付款 */}
        {dataSource.state === 0 && (
          <div className={styles.canOrPayContainer}>
            <div className={styles.cancel} onClick={() => handleCancelOrder()}>
              取消订单?
            </div>
            <Button className={styles.payButton} onClick={() => handlePay()}>
              立即支付
            </Button>
          </div>
        )}

        {/* 已付款 */}
        {dataSource.state === 1 && (
          <div className={styles.canOrPayContainer}>
            <div className={styles.cancel} onClick={() => handleRefund()}>
              退款?
            </div>
            <Button className={styles.payButton} onClick={() => handleUse()}>
              立即使用
            </Button>
          </div>
        )}

        {/* 已使用 ，待评价*/}
        {dataSource.state === 2 && (
          <div className={styles.canOrPayContainer}>
            <Button className={styles.payButton} onClick={() => handleComment()}>
              立即评价
            </Button>
          </div>
        )}

        {/* 已完成 ，可删除*/}
        {(dataSource.state === 3 || dataSource.state === 4 || dataSource.state === 5) && (
          <div className={styles.canOrPayContainer}>
            <Button className={styles.payButton} onClick={() => handleDelete()}>
              删除订单
            </Button>
          </div>
        )}
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
1.根据订单状态，动态决定渲染哪些操作按钮的组合
*/
