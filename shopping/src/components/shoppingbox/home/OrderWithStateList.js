import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './OrderWithStateList.module.css'

import axios from 'axios'

/*antd*/
import { Button, List, Space } from 'antd'
import { BankOutlined } from '@ant-design/icons'

export default function OrderWithStateList(props) {
  /*antd*/
  const limit = 2

  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [orderlist, setOrderlist] = useState([])
  const [page, setPage] = useState(1)

  //请求接口拿到数据之后，更新三个状态
  const pageRef = useRef(null)
  useEffect(() => {
    // console.log(props.orderState)

    axios.get('/orderlist', { params: { page: page, limit: limit, orderState: props.orderState, currentUserId: props.currentUserId } }).then(res => {
      setInitLoading(false)

      if (res.data.AcitionType === 'ERROR') {
        return
      }
      setOrderlist(res.data)

      pageRef.current = page
    })
  }, [props.orderState])

  //加载更多按钮点击事件处理函数，首先更新loading的状态为true
  const onLoadMore = () => {
    setLoading(true)

    //解决setPage异步更新问题！
    pageRef.current = page + 1
    setPage(page + 1)

    axios.get('/orderlist', { params: { page: pageRef.current, limit: limit, orderState: props.orderState, currentUserId: props.currentUserId } }).then(res => {
      if (res.data.AcitionType === 'ERROR') {
        return
      } else {
        setOrderlist([...orderlist, ...res.data])
        setLoading(false)

        window.dispatchEvent(new Event('resize'))
      }
    })
  }

  //控制加载更多按钮是否显示：没在加载状态时才显示
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          marginBottom: '12px',
          height: 32,
          lineHeight: '32px'
        }}
      >
        <Button onClick={onLoadMore}>加载更多</Button>
      </div>
    ) : null

  //去订单详情页
  const navigate = useNavigate()
  const handleToDetail = orderId => {
    navigate(`/shopping/order-detail/${orderId}`)
  }

  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={orderlist}
        rowKey={item => item._id}
        renderItem={item => (
          <List.Item onClick={() => handleToDetail(item._id)}>
            {/* 我要在列表的每一个列里面放的结构就应该放在<List.Item></List.Item>中 */}
            <div className={styles.iconContainer}>
              <BankOutlined className={styles.icon} />
            </div>

            <List.Item.Meta
              title={item.hotelName}
              description={
                <Space direction="vertical" size="7">
                  <span>{item.roomName}</span>
                  <span>{`${item.checkInDate} 至 ${item.checkOutDate} 1晚/${item.roomNum}间`}</span>
                </Space>
              }
            />
            <div className={styles.rightContainer}>
              <Space direction="vertical" size="small" align="end">
                {item.state === 0 && (
                  <>
                    <span className={styles.state}>待付款</span>
                    <span className={styles.price}>{`¥${item.sum}`}</span>
                    <div className={styles.toDetail}>{`查看详情>`}</div>
                  </>
                )}

                {item.state === 1 && (
                  <>
                    <span className={styles.state}>未出行</span>
                    <div>
                      <span className={styles.payOline}>在线支付</span>
                      <span className={styles.price}>{`¥${item.sum}`}</span>
                    </div>
                    <div className={styles.toDetail}>{`查看详情>`}</div>
                  </>
                )}

                {item.state === 2 && (
                  <>
                    <span className={styles.state}>待评价</span>
                    <div>
                      <span className={styles.payOline}>在线支付</span>
                      <span className={styles.price}>{`¥${item.sum}`}</span>
                    </div>
                    <div className={styles.toDetail}>{`查看详情>`}</div>
                  </>
                )}

                {item.state === 3 && (
                  <>
                    <span className={styles.state}>已完成</span>
                    <div>
                      <span className={styles.payOline}>在线支付</span>
                      <span className={styles.price}>{`¥${item.sum}`}</span>
                    </div>
                    <div className={styles.toDetail}>{`查看详情>`}</div>
                  </>
                )}

                {item.state === 4 && (
                  <>
                    <span className={styles.failState}>已取消</span>
                    <div>
                      <span className={styles.price}>{`¥${item.sum}`}</span>
                    </div>
                    <div className={styles.toDetail}>{`查看详情>`}</div>
                  </>
                )}

                {item.state === 5 && (
                  <>
                    <span className={styles.failState}>已退款</span>
                    <div>
                      <span className={styles.payOline}>在线支付</span>
                      <span className={styles.price}>{`¥${item.sum}`}</span>
                    </div>
                    <div className={styles.toDetail}>{`查看详情>`}</div>
                  </>
                )}
              </Space>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}
