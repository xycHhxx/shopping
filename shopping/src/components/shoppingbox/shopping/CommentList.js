import React, { useEffect, useState, useRef } from 'react'

import axios from 'axios'

/*antd*/
import { Button, List, Skeleton, Avatar, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export default function CommentList(props) {
  /*antd*/
  const limit = 2

  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [commentlist, setCommentlist] = useState([])
  const [page, setPage] = useState(1)

  //请求接口拿到数据之后，更新三个状态
  const pageRef = useRef(null)
  useEffect(() => {
    axios.get('/commentlist', { params: { page: page, limit: limit, hotelId: props.hotelId } }).then(res => {
      setInitLoading(false)

      if (res.data.AcitionType === 'ERROR') {
        return
      }

      setCommentlist(res.data)

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

    axios.get('/commentlist', { params: { page: pageRef.current, limit: limit, hotelId: props.hotelId } }).then(res => {
      if (res.data.AcitionType === 'ERROR') {
        return
      } else {
        setCommentlist([...commentlist, ...res.data])
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

  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={commentlist}
        rowKey={item => item._id}
        renderItem={item => (
          <List.Item>
            {/* 我要在列表的每一个列里面放的结构就应该放在<List.Item></List.Item>中 */}
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta avatar={<Avatar size="large" icon={<UserOutlined />} />} title={item.roomName} description={item.content} />
              <Space direction="vertical" size="7">
                <span style={{ fontSize: 13, color: '#8C8C8C' }}>{`发布人：${item.author}`}</span>
                <span style={{ fontSize: 13, color: '#8C8C8C' }}>{item.publishTime}</span>
              </Space>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}
