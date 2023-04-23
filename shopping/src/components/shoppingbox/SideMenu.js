import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import './SideMenu.css'

/*redux*/
import { connect } from 'react-redux'

/*antd */
import { Layout, Menu } from 'antd'
import { HomeOutlined, ToolOutlined, ShoppingOutlined } from '@ant-design/icons'
const { Sider } = Layout

const SideMenu = props => {
  //根据当前登录用户的role，设置侧边栏
  const superManagerMenu = [
    {
      key: '/registercheck',
      children: [],
      label: '注册审核'
    }
  ]
  const managerMenu = [
    {
      key: '/shopping',
      children: [],
      label: '订购'
    },
    {
      key: '/management',
      children: [
        {
          key: '/management/users',
          label: '用户管理'
        },
        {
          key: '/management/orders',
          label: '订单管理'
        }
      ],
      label: '后台管理'
    },
    {
      key: '/my',
      children: [
        {
          key: '/my/home',
          label: '订单信息'
        }
      ],
      label: '我的'
    }
  ]
  const consumerMenu = [
    {
      key: '/shopping',
      children: [],
      label: '订购'
    },
    {
      key: '/my',
      children: [
        {
          key: '/my/home',
          label: '订单信息'
        }
      ],
      label: '我的'
    }
  ]

  /*antd*/
  const iconList = {
    '/shopping': <ShoppingOutlined />,
    '/my': <HomeOutlined />,
    '/management': <ToolOutlined />,
    '/registercheck': <ToolOutlined />
  }

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type
    }
  }

  var itemMenu = []
  switch (props.currentRole) {
    case 0:
      itemMenu = superManagerMenu
      break
    case 1:
      itemMenu = managerMenu
      break
    case 2:
      itemMenu = consumerMenu
      break
    default:
      itemMenu = consumerMenu
      break
  }
  const items = itemMenu.map(item => {
    return getItem(item.label, item.key, iconList[item.key], item.children?.length === 0 ? null : item.children)
  })

  //设置侧边栏路由跳转、根据当前路径设置高亮及默认打开项
  const navigate = useNavigate()
  const location = useLocation()
  const open = '/' + location.pathname.split('/')[1]

  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      <Menu theme="dark" mode="inline" selectedKeys={[open, location.pathname]} defaultOpenKeys={[open]} items={items} onClick={prams => navigate(prams.key)} />
    </Sider>
  )
}

//redux
const mapStateToProps = state => {
  return {
    isCollapsed: state.CollapsedReducer.isCollapsed,
    currentRole: state.CurrentRoleReducer.currentRole
  }
}

export default connect(mapStateToProps)(SideMenu)
