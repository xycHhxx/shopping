import React, { useEffect, useState } from 'react'
import { useNavigate, useMatch } from 'react-router-dom'

import styles from './css/Order.module.css'

import axios from 'axios'

/*redux*/
import { connect } from 'react-redux'

/*antd*/
import { Space, Form, DatePicker, ConfigProvider, Select, Input, Button, message } from 'antd'
import { EnvironmentOutlined, CoffeeOutlined, InfoCircleOutlined } from '@ant-design/icons'
//日期选择组件的国际化配置
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import locale from 'antd/locale/zh_CN'
const { RangePicker } = DatePicker
const { Option } = Select

const Order = props => {
  //拿到当前预订房间的_id
  const match = useMatch('/shopping/order/:roomId')
  const room_id = match.params.roomId

  const [roomInf, setRoomInf] = useState({})
  const [hotelInf, setHotelInf] = useState({})
  const [sum, setSum] = useState(0)

  useEffect(() => {
    axios.get('/room-with-hotel', { params: { room_id } }).then(res => {
      // console.log(res.data[0])
      // console.log(res.data[0].sourceHotel)

      setRoomInf(res.data[0])
      setHotelInf(res.data[0].sourceHotel)
      setSum(res.data[0].price)
    })
  }, [room_id])

  useEffect(() => {
    //切换路由时滚动条回到顶部：要在真正产生滚动条的元素上用
    const container = document.querySelector('div > section > section > main')
    if (container) {
      container.scrollTo(0, 0)
    }
  }, [])

  /*antd*/
  /*Form*/
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = values => {
    // console.log('Success:', values)

    const tel = values.prefix + '-' + values.subscriberTelNum
    // console.log(tel)

    const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    // console.log(createTime)

    //如当前库存为0，阻止生成订单
    if (roomInf.stock === 0) {
      message.error('该房型已售停！')
      return
    }

    axios
      .post('/orders', {
        sourceUserId: props.currentUserId,
        sourceUserName: props.currentUsername,
        hotelName: hotelInf.hotelname,
        roomName: roomInf.roomName,
        roomId: room_id,
        checkInDate: values.date[0],
        checkOutDate: values.date[1],
        roomNum: values.roomNum,
        resident: values.subscriberName,
        tel: tel,
        sum: sum,
        createTime: createTime,
        state: 0
      })
      .then(res => {
        const currentOrderId = res.data

        //生成订单之后即刻更新库存
        const newStock = roomInf.stock - parseInt(values.roomNum)
        axios.patch('/room-stock-update', { roomId: room_id, newStock: newStock }).then(res => {
          navigate(`/shopping/pay/${currentOrderId}`)
        })
      })
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  /*RangePicker*/
  const [dates, setDates] = useState(null)
  const [value, setValue] = useState(null)
  const disabledDate = current => {
    //禁止选择今天之前、明天之后的日期
    return current < dayjs().startOf('day') || current > dayjs().add(1, 'day').endOf('day')
  }
  const onOpenChange = open => {
    if (open) {
      setDates([null, null])
    } else {
      setDates(null)
    }
  }

  /*选择房间数的Select*/
  //依赖数组,根据库存动态创建option
  var roomNumSelectOption = []
  for (var i = 1; i <= roomInf.stock; i++) {
    roomNumSelectOption.push({
      value: `${i}`,
      label: `${i}`
    })
  }
  //应付总额
  const handleSelectRoomNum = value => {
    setSum(parseInt(value) * parseInt(roomInf.price))
    // console.log(sum)
  }

  /*号码的input*/
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  )

  return (
    <div className={styles.bigestContainer}>
      {/* 上半部分：所选酒店+房间信息 */}
      <div className={styles.header}>
        <div className={styles.hotel}>{hotelInf.hotelname}</div>

        <div className={styles.location}>
          <EnvironmentOutlined style={{ paddingRight: '5px' }} />
          {hotelInf.location}
        </div>
        <div className={styles.roomName}>{roomInf.roomName}</div>
        <div className={styles.roomDescribe}>
          <Space size="large">
            <span>{roomInf.descriptions}</span>
            <div>
              <CoffeeOutlined />
              <span style={{ marginLeft: '5px' }}>{roomInf.breakfast}</span>
            </div>
          </Space>
        </div>
      </div>

      {/* 下半部分：选日期组件+订房人填写基本信息（有整体的布局组件：住客姓名、电话号码用组件）+应付总额---去支付按钮 */}

      <div className={styles.body}>
        <Form
          form={form}
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
          initialValues={{
            date: [dayjs().format('YYYY-MM-DD'), dayjs().add(1, 'day').format('YYYY-MM-DD')],
            roomNum: '1',
            prefix: '86'
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          {/* 日期+房间数 */}
          <div className={styles.dateAndRoomNum}>
            <Space size="large">
              <div>
                <div className={styles.subTime}>预订时间</div>

                <Form.Item
                  name="date"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: '请选择入住和退房时间!'
                    }
                  ]}
                >
                  <ConfigProvider locale={locale}>
                    <RangePicker
                      value={dates || value}
                      disabledDate={disabledDate}
                      onCalendarChange={val => setDates(val)}
                      onChange={val => setValue(val)}
                      onOpenChange={onOpenChange}
                      bordered={false}
                      separator={<div className={styles.dateSeparator}>1晚</div>}
                      placeholder={[dayjs().format('YYYY-MM-DD'), dayjs().add(1, 'day').format('YYYY-MM-DD')]}
                      size="middle  "
                    />
                  </ConfigProvider>
                </Form.Item>
              </div>

              <div className={styles.roomNum}>
                <div style={{ color: '#455873' }}>房间数</div>
                {roomInf.stock === 0 ? (
                  <div style={{ color: 'red', width: 120 }}>已售空</div>
                ) : (
                  <Form.Item
                    name="roomNum"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: '请选择房间数量！'
                      }
                    ]}
                  >
                    <Select
                      // defaultValue="1"
                      style={{
                        width: 120
                      }}
                      bordered={false}
                      options={roomNumSelectOption}
                      onSelect={handleSelectRoomNum}
                    />
                  </Form.Item>
                )}
              </div>
            </Space>
          </div>

          {/* 住客资料 */}
          <div className={styles.subscriberInfContainer}>
            <div className={styles.subscriberName}>住客资料</div>
            <div className={styles.tip}>
              <span style={{ marginRight: '5px' }}>请填写真实的身份信息，姓名与证件保持一致</span>
              <InfoCircleOutlined />
            </div>

            <Form.Item
              name="subscriberName"
              label={<span className={styles.labels}>住客姓名</span>}
              rules={[
                {
                  required: true,
                  message: '请填写住客姓名！'
                }
              ]}
            >
              <Input className={styles.subNamInp} />
            </Form.Item>

            <Form.Item
              name="subscriberTelNum"
              label={<span className={styles.labels}>电话号码</span>}
              rules={[
                {
                  required: true,
                  message: '请填写电话号码！'
                }
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: '300px'
                }}
              />
            </Form.Item>
          </div>

          {/* 应付总额+提交订单按钮 */}
          <div className={styles.bottonContainer}>
            <Space align="baseline">
              <span className={styles.shoulePay}>应付总额</span>
              <div className={styles.sumPrice}>{`¥${sum}`}</div>

              <Form.Item>
                <Button htmlType="submit" className={styles.button}>
                  提交订单
                </Button>
              </Form.Item>
            </Space>
          </div>
        </Form>
      </div>
    </div>
  )
}

//redux
const mapStateToProps = state => {
  return {
    currentUsername: state.CurrentUsernameReducer.currentUsername,
    currentUserId: state.CurrentUserIdReducer.currentUserId
  }
}

export default connect(mapStateToProps)(Order)

/*
1.获取酒店信息、预定的房间信息
2.生成一条订单数据：
1）注意state改为未付款
2）要有订单创建时间
*/
