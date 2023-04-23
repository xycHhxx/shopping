import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import styles from './Register.module.css'

/*antd */
import { Button, Form, Input, Select, message } from 'antd'
const { Option } = Select
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

export default function Register() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  //注册事件处理函数
  const onFinish = values => {
    // console.log(values)
    axios
      .post('/register', {
        ...values,
        role: values.role === '消费者' ? 2 : 1
      })
      .then(res => {
        // console.log(res.data)
        if (res.data.role === 2) {
          navigate('/login')
          message.success('注册成功，请重新登录！')
        } else if (res.data.role === 1) {
          navigate('/login')
          message.success('注册待审核，结果将于30分钟内发送至您的邮箱，请注意查收！')
        } else {
          message.error(res.data)
        }
      })
  }

  //返回事件处理函数
  const handleBack = () => {
    navigate('/login')
  }

  return (
    <div className={styles.biggestContainer}>
      <div className={styles.coverBox}>
        <div style={{ width: '500px', height: '30px', margin: '80px auto', color: 'white' }}>
          <span style={{ padding: 20 }}>基础信息</span>
          <hr />
        </div>
        <div className={styles.formContainer}>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            style={{
              maxWidth: 600
            }}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              label={<span style={{ color: 'white', fontSize: 14 }}>用户名</span>}
              colon={true}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                  whitespace: true
                }
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span style={{ color: 'white', fontSize: 14 }}>密码</span>}
              colon={true}
              rules={[
                {
                  required: true,
                  message: '请输入密码!'
                }
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label={<span style={{ color: 'white', fontSize: 14 }}>确认密码</span>}
              colon={true}
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请输入密码!'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('密码输入不一致!'))
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span style={{ color: 'white', fontSize: 14 }}>邮箱</span>}
              colon={true}
              rules={[
                {
                  type: 'email',
                  message: '请输入正确的邮箱!'
                },
                {
                  required: true,
                  message: '请输入您的邮箱!'
                }
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>

            <Form.Item
              name="role"
              label={<span style={{ color: 'white', fontSize: 14 }}>用户类型</span>}
              colon={true}
              rules={[
                {
                  required: true,
                  message: '请输入用户类型!'
                }
              ]}
            >
              <Select placeholder="请选择用户类型">
                <Option value="消费者">消费者</Option>
                <Option value="管理员">管理员</Option>
              </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: 'rgba(255,255,255,0.4)', marginTop: '30px' }}>
                注册
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: 'rgba(255,255,255,0.4)', marginTop: '30px', marginLeft: '40px' }}
                onClick={() => {
                  handleBack()
                }}
              >
                返回
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
