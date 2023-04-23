import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './css/Commodities.module.css'

import axios from 'axios'

/*antd*/
import { Card, Col, Row, Tag, Pagination } from 'antd'
const { Meta } = Card

export default function Commodities() {
  /*antd*/
  /*Card*/
  //获取酒店列表
  const [hotelList, setHotelList] = useState([])
  useEffect(() => {
    axios.get('/commodity').then(res => {
      setHotelList(res.data)
    })
  }, [])

  //Card点击事件处理函数，去酒店详情
  const navigate = useNavigate()
  const handleToDetail = id => {
    navigate(`/shopping/commodity-details/${id}`)
  }

  /*Pagination*/
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(4)
  const [current, setCurrent] = useState(1)
  const onChange = page => {
    setStart((page - 1) * 4)
    setEnd((page - 1) * 4 + 4)
    setCurrent(page)
  }

  return (
    <div>
      <div style={{ height: '60px' }}>
        <div className={styles.titleContainer}>
          酒店<span style={{ color: '#FF7700' }}>推荐</span>
        </div>
      </div>
      <Row gutter={[16, 16]}>
        {hotelList.length !== 0 &&
          hotelList.slice(start, end).map(item => {
            return (
              <Col span={6} key={item._id}>
                <Card
                  hoverable
                  style={{
                    height: 340
                  }}
                  cover={<img alt={item.hotelname} src={item.img} />}
                  onClick={() => {
                    handleToDetail(item._id)
                  }}
                >
                  <Meta title={item.hotelname} />
                  <div className={styles.middleContainer}>
                    <Tag color="#108ee9" className={styles.score}>
                      {item.score}
                    </Tag>
                    <span style={{ color: '#3BA2F8' }}>超棒</span>
                    <div className={styles.prePrice}>{`¥${item.prePrice}`}</div>
                  </div>
                  <div>
                    <div className={styles.comment}>{`${item.commentNum}条点评`}</div>
                    <div className={styles.price}>{`¥${item.price}`}</div>
                  </div>
                </Card>
              </Col>
            )
          })}
      </Row>

      {/* 分页 */}
      <div className={styles.paginationContainer}>
        <Pagination defaultCurrent={1} size="small" total={hotelList.length} pageSize={4} current={current} onChange={onChange} />
      </div>
    </div>
  )
}
