import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import OrderWithStateList from '../../../components/shoppingbox/home/OrderWithStateList'

import styles from './Home.module.css'

/*redux*/
import { connect } from 'react-redux'

/*antd*/
import { Tabs, Avatar, Button, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import axios from 'axios'

const Home = props => {
  const [currentUserInf, setCurrentUserInf] = useState({})

  useEffect(() => {
    axios.get('/user', { params: { currentUserId: props.currentUserId } }).then(res => {
      setCurrentUserInf(res.data[0])
    })
  }, [])

  //账户充值
  const navigate = useNavigate()
  const handleTopUp = () => {
    navigate(`/my/topup/${props.currentUserId}`)
  }

  /*antd*/
  /*Tabs*/
  const items = [
    {
      key: '1',
      label: `全部订单`,
      children: <OrderWithStateList orderState={6} currentUserId={props.currentUserId} />
    },
    {
      key: '2',
      label: `待付款`,
      children: <OrderWithStateList orderState={0} currentUserId={props.currentUserId} />
    },
    {
      key: '3',
      label: `未出行`,
      children: <OrderWithStateList orderState={1} currentUserId={props.currentUserId} />
    },
    {
      key: '4',
      label: `待评价`,
      children: <OrderWithStateList orderState={2} currentUserId={props.currentUserId} />
    }
  ]
  const onChange = key => {
    // console.log(key)
  }

  return (
    <div className={styles.biggestContainer}>
      <div className={styles.header}>
        <div className={styles.usernameContainer}>
          <Avatar size={64} icon={<UserOutlined />} style={{ margin: '0 25px 10px 40px' }} />
          {currentUserInf.username}
        </div>
        <div className={styles.assetsContainer}>
          <Space align="baseline">
            <div className={styles.assets}>{`账户余额：${currentUserInf.assets}`}</div>
            <Button className={styles.button} size="small" onClick={handleTopUp}>
              充值
            </Button>
          </Space>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', paddingLeft: '15px' }}>
        <Tabs defaultActiveKey="1" items={items} tabBarGutter="44px" onChange={onChange}></Tabs>
      </div>
    </div>
  )
}

//redux
const mapStateToProps = state => {
  return {
    currentUserId: state.CurrentUserIdReducer.currentUserId
  }
}

export default connect(mapStateToProps)(Home)
