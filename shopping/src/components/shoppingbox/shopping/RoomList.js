import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './RoomList.module.css'

import axios from 'axios'

/*antd*/
import { Button, List, Skeleton, Image } from 'antd'

export default function RoomList(props) {
  // const roomList = [
  //   {
  //     img: 'https://dimg04.c-ctrip.com/images/0203a120007ab423l42D6_W_1080_808_R5_D.jpg_.webp',
  //     roomName: '曙光·舒适大床房',
  //     descriptions: '1张1.8米大床 | 26-28m² | 有窗 | 禁烟',
  //     breakfast: '有早餐',
  //     prePrice: 877,
  //     price: 554
  //   },
  //   {
  //     img: 'https://dimg04.c-ctrip.com/images/0200w120007abj9znE83B_W_1080_808_R5_D.jpg_.webp',
  //     roomName: '午后·豪华套房',
  //     descriptions: '1张1.8米大床 | 46-48m² | 有窗 | 禁烟',
  //     breakfast: '有早餐',
  //     prePrice: 1179,
  //     price: 751
  //   },
  //   {
  //     img: 'https://dimg04.c-ctrip.com/images/1mc6j12000aorhqj338BD_W_1080_808_R5_D.jpg_.webp',
  //     roomName: '高级大床房',
  //     descriptions: '1张1.8米大床 | 28m² | 有窗 | 禁烟',
  //     breakfast: '无早餐',
  //     prePrice: 754,
  //     price: 707
  //   },
  //   {
  //     img: 'https://dimg04.c-ctrip.com/images/0204g1200087exu0oE198_W_1080_808_R5_D.jpg_.webp',
  //     roomName: '豪华双床房',
  //     descriptions: '2张1.1米单人床 | 35m² | 有窗 | 禁烟',
  //     breakfast: '无早餐',
  //     prePrice: 852,
  //     price: 799
  //   },
  //   {
  //     img: 'https://dimg04.c-ctrip.com/images/0201u120009i389192508_W_1080_808_R5_D.jpg_.webp',
  //     roomName: '落地窗轻奢大床房',
  //     descriptions: '1张1.81米特大床 | 35m² | 落地窗 | 禁烟',
  //     breakfast: '有早餐',
  //     prePrice: 658,
  //     price: 447
  //   },
  //   {
  //     img: 'https://dimg04.c-ctrip.com/images/0202s120009i3ra78123A_W_1080_808_R5_D.jpg_.webp',
  //     roomName: '热带雨林豪华大床房',
  //     descriptions: '1张1.8米榻榻米 | 35m² | 落地窗 | 禁烟',
  //     breakfast: '有早餐',
  //     prePrice: 768,
  //     price: 521
  //   },
  //   {
  //     img: 'https://dimg04.c-ctrip.com/images/02019120008d8edkn29AF_W_1080_808_R5_D.jpg_.webp',
  //     roomName: '景观标准房',
  //     descriptions: '2张1.35米双人床 | 40m² | 有窗 | 禁烟',
  //     breakfast: '有早餐',
  //     prePrice: 1638,
  //     price: 1228
  //   },
  //   {
  //     img: 'https://dimg04.c-ctrip.com/images/0201o120008d8gaxvF11A_W_1080_808_R5_D.jpg_.webp',
  //     roomName: '庭院大床房',
  //     descriptions: '1张1.8米大床 | 37m² | 有窗 | 禁烟',
  //     breakfast: '有早餐',
  //     prePrice: 1888,
  //     price: 1415
  //   }
  // ]

  /*antd*/
  const limit = 1

  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [roomlist, setRoomList] = useState([])
  const [page, setPage] = useState(1)

  //请求接口拿到数据之后，更新三个状态
  const pageRef = useRef(null)
  useEffect(() => {
    axios.get('/roomlist', { params: { page: page, limit: limit, hotelId: props.hotelId } }).then(res => {
      setInitLoading(false)
      setRoomList(res.data)

      pageRef.current = page
    })
  }, [])

  //加载更多按钮点击事件处理函数，首先更新loading的状态为true
  const onLoadMore = () => {
    setLoading(true)

    //解决setPage异步更新问题！
    pageRef.current = page + 1
    setPage(page + 1)

    //因为点击了加载更多，所以再次请求接口接着获取另外limit条数据

    axios.get('/roomlist', { params: { page: pageRef.current, limit: limit, hotelId: props.hotelId } }).then(res => {
      if (res.data.AcitionType === 'ERROR') {
        return
      } else {
        setRoomList([...roomlist, ...res.data])
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
          height: 32,
          lineHeight: '32px'
        }}
      >
        <Button onClick={onLoadMore}>加载更多</Button>
      </div>
    ) : null

  //预定点击事件
  const navigate = useNavigate()
  const handleToOrder = roomId => {
    navigate(`/shopping/order/${roomId}`)
  }

  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={roomlist}
        rowKey={item => item._id}
        renderItem={item => (
          <List.Item>
            {/* 我要在列表的每一个列里面放的结构就应该放在<List.Item></List.Item>中 */}
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta avatar={<Image width={120} src={item.img} fallback="https://img0.baidu.com/it/u=2570981049,4015989895&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=400" />} title={item.roomName} description={item.descriptions} />
              <div className={styles.breakfast}>{item.breakfast}</div>
              <div className={styles.priceContainer}>
                <div style={{ float: 'right' }}>
                  <span className={styles.prePrice}>{`¥${item.prePrice}`}</span>
                  <span className={styles.price}>{`¥${item.price}`}</span>
                </div>
              </div>
              <Button
                className={styles.button}
                onClick={() => {
                  handleToOrder(item._id)
                }}
              >
                预定
              </Button>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}
