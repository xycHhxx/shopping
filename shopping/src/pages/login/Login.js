import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import './Login.css'

/*redux*/
import { connect } from 'react-redux'

/*antd */
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'

const Login = props => {
  //创建Form实例
  const [form] = Form.useForm()

  //登录按钮事件处理函数
  const navigate = useNavigate()
  const onFinish = values => {
    axios.post('/login', values).then(res => {
      if (res.data.AcitionType === 'ERROR') {
        //登录失败，提示并清空表单
        message.error('用户名或密码错误，请重新登陆!')
        form.resetFields()
      } else {
        navigate('/')

        //每次重新登录更新公共状态currentUsername、currentRole、currentUserId
        props.changeCurrentUsername(res.data[0].username)
        props.changeCurrentRole(res.data[0].role)
        props.changeCurrentUserId(res.data[0]._id)
      }
    })
  }

  //注册按钮点击事件处理函数
  const handleRegister = () => {
    navigate('/register')
    // console.log('注册！')
  }

  return (
    <div className="containerBigget">
      <div className="formContainer">
        <div className="title">用 户 登 录</div>
        <Form name="normal_login" className="login-form" onFinish={onFinish} form={form}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!'
              }
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!'
              }
            ]}
          >
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" autoComplete="off" />
          </Form.Item>

          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              登录
            </Button>

            <Button
              type="primary"
              className="login-form-button"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', marginLeft: '30px' }}
              onClick={() => {
                handleRegister()
              }}
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

//redux
const mapDispatchToProps = {
  changeCurrentUsername: payload => {
    return {
      type: 'change-username',
      payload: payload
    }
  },
  changeCurrentRole: payload => {
    return {
      type: 'change-role',
      payload: payload
    }
  },
  changeCurrentUserId: payload => {
    return {
      type: 'change-userId',
      payload: payload
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)
