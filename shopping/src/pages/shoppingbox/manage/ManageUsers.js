import React, { useEffect, useState } from 'react'

import styles from './ManageUsers.module.css'

import axios from 'axios'

/*antd*/
import { Table, Button, Modal, Switch } from 'antd'
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'
const { confirm } = Modal

export default function ManageUsers() {
  const [userList, setUserList] = useState([])
  useEffect(() => {
    axios.get('/users').then(res => {
      setUserList(res.data)
    })
  }, [])

  /*antd*/
  /*Table*/
  const roleList = ['超级管理员', '管理员', '消费者']
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      align: 'center'
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      render: role => {
        return roleList[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'userState',
      key: 'userState',
      align: 'center',
      render: (userState, item) => {
        return <Switch checked={userState} onChange={() => handleSwiChange(item)}></Switch>
      }
    },
    {
      title: '操作',
      key: 'behavior',
      align: 'center',
      render: item => {
        return (
          <Button
            type="primary "
            shape="circle"
            danger={true}
            ghost={true}
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDelete(item)
            }}
          ></Button>
        )
      }
    }
  ]

  //用户状态开关，切换时的处理函数
  const handleSwiChange = item => {
    // console.log('axios前：', item.userState)

    axios.patch('/user-state-update', { _id: item._id, userState: !item.userState }).then(res => {
      setUserList(
        userList.map(data => {
          if (data._id === item._id) {
            // console.log('axios后：', item.userState)
            data.userState = !item.userState
            return data
          }
          return data
        })
      )
    })
  }

  //删除Bottom的事件处理函数
  const handleDelete = item => {
    confirm({
      title: '确认删除该用户吗?',
      icon: <ExclamationCircleFilled />,
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk() {
        setUserList(userList.filter(data => data._id !== item._id))

        axios.delete('/user', { params: { _id: item._id } })
      },
      onCancel() {}
    })
  }

  return (
    <div className={styles.biggestContainer}>
      <div className={styles.tableContainer}>
        <Table dataSource={userList} columns={columns} pagination={{ pageSize: 4, size: 'small' }} />
      </div>
    </div>
  )
}
