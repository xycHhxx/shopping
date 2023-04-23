import React, { useEffect, useState } from 'react'
import { useNavigate, useMatch } from 'react-router-dom'

import styles from './TopUp.module.css'

import axios from 'axios'

/*antd*/
import { Space, Image, Button, Form, Input, Modal } from 'antd'
import { TransactionOutlined } from '@ant-design/icons'

export default function TopUp() {
  //拿到当前用户的id
  const match = useMatch('/my/topup/:userId')
  const currentUserId = match.params.userId

  const [currentUserInf, setCurrentUserInf] = useState({})

  useEffect(() => {
    axios.get('/user', { params: { currentUserId } }).then(res => {
      setCurrentUserInf(res.data[0])
    })
  }, [])

  //取消充值事件
  const handleCancelPay = () => {
    window.history.back()
  }

  /*antd*/
  //Form
  const [updatedAssets, setUpdatedAssets] = useState(0)

  const onFinish = values => {
    const newAssets = currentUserInf.assets + parseInt(values.topup)
    axios.patch('/user-assets-update', { sourceUserId: currentUserId, newAssets }).then(res => {
      // console.log(res.data)
      setUpdatedAssets(newAssets)
      setIsModalOpen(true)
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
    window.history.back()
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={styles.biggestContainer}>
      {/* header */}
      <div className={styles.header}>
        <Space>
          <span className={styles.saveText}>账户充值</span>
          <div className={styles.left}>
            <TransactionOutlined />
            <span style={{ marginLeft: '5px' }}>无障碍</span>
          </div>
        </Space>
      </div>

      <Form
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        {/* infContainer */}
        <div className={styles.infContainer}>
          <Space size={0}>
            <div className={styles.priceContainer}>
              <span>余额：</span>
              <span className={styles.price}>{`¥${currentUserInf.assets}`}</span>
            </div>

            <div className={styles.topUpInf}>
              <Form.Item
                name="topup"
                label={<span style={{ fontSize: 16 }}>充值金额：</span>}
                rules={[
                  {
                    required: true,
                    message: '请输入充值金额!'
                  }
                ]}
              >
                <Input placeholder="请输入金额~" />
              </Form.Item>
            </div>
          </Space>
        </div>

        {/* payContainer */}
        <div className={styles.payContainer}>
          <Image width={100} src="https://gw.alipayobjects.com/mdn/rms_3dad6b/afts/img/A*RumeRK2mkhsAAAAAAAAAAAAAARQnAQ" fallback="https://img0.baidu.com/it/u=2570981049,4015989895&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=400" />
          <div className={styles.canOrPayContainer}>
            <div className={styles.cancel} onClick={() => handleCancelPay()}>
              取消充值?
            </div>
            <Button className={styles.payButton} htmlType="submit">
              充值
            </Button>
          </div>
        </div>
      </Form>

      {/* 充值后弹出 */}
      <Modal
        title="充值成功！"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            返回
          </Button>
        ]}
      >
        <p>{`当前余额为 ¥${updatedAssets}`}</p>
      </Modal>
    </div>
  )
}
