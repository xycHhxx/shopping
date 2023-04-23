import React, { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom'

import styles from './css/CommodityDetails.module.css'

import axios from 'axios'

//自封装房间、点评列表组件
import RoomList from '../../../components/shoppingbox/shopping/RoomList'
import CommentList from '../../../components/shoppingbox/shopping/CommentList'

/*antd*/
import { Image, Tag, Tabs } from 'antd'
import { EnvironmentOutlined, LeftOutlined } from '@ant-design/icons'

export default function CommodityDetails() {
  //拿到当前商品的_id
  const match = useMatch('/shopping/commodity-details/:id')
  const current_hotel_id = match.params.id

  const [dataSource, setDataSource] = useState({})
  useEffect(() => {
    axios.get('/commodity-detail', { params: { current_hotel_id } }).then(res => {
      setDataSource(res.data[0])
    })
  }, [current_hotel_id])

  /*antd*/
  /*Tabs*/
  const items = [
    {
      key: '1',
      label: `房间`,
      children: <RoomList hotelId={current_hotel_id} />
    },
    {
      key: '2',
      label: `点评`,
      children: <CommentList hotelId={current_hotel_id} />
    }
  ]

  //切换Tab
  const onChange = key => {
    // console.log(key)
  }

  return (
    <div>
      {/* 上半部分，酒店基本信息 */}
      <div>
        <div className={styles.topTitle}>
          <LeftOutlined className={styles.backIcon} onClick={() => window.history.back()} />
          <span style={{ color: '#FF7700' }}>商品</span>详情
        </div>

        <hr style={{ border: '1px solid rgb(240,240,240)' }} />

        <div className={styles.imgAndDesContainer}>
          <Image width={400} src={dataSource.img} fallback="https://img0.baidu.com/it/u=2570981049,4015989895&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=400" />

          <div className={styles.DescriptionsContainer}>
            <div className={styles.DesTitle}>{dataSource.hotelname}</div>

            <div className={styles.location}>
              <EnvironmentOutlined style={{ paddingRight: '5px' }} />
              {dataSource.location}
            </div>

            <div className={styles.DesBotton}>
              <div className={styles.scoreRow}>
                <Tag color="#108ee9" className={styles.Tag}>
                  {`${dataSource.score}分`}
                </Tag>
                <span className={styles.leftSpan}>超棒</span>
                <div className={styles.prePrice}>{`¥${dataSource.prePrice}`}</div>
              </div>
              <div>
                <div className={styles.comments}>{`${dataSource.commentNum}条点评`}</div>
                <div className={styles.price}>{`¥${dataSource.price}`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 下半部分 ：房间、点评*/}
      <div className={styles.TabsContainer}>
        <Tabs defaultActiveKey="1" items={items} tabBarGutter="44px" onChange={onChange}></Tabs>
      </div>
    </div>
  )
}
