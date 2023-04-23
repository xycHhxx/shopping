import React from 'react'
import { useNavigate } from 'react-router-dom'

/*redux*/
import { connect } from 'react-redux'

/*antd*/
import { Layout, theme, Dropdown, Avatar } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
const { Header } = Layout

const TopHeader = props => {
  /*antd*/
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  /*Dropdown*/
  //下拉列表的选项
  const items = [
    {
      key: '1',
      label: `${props.currentUsername}`
    },

    {
      key: '2',
      danger: true,
      label: '退出'
    }
  ]

  //下拉列表选项的点击事件处理函数
  const navigate = useNavigate()

  const onClick = ({ key }) => {
    if (key === '2') {
      //清空token，退出登录
      localStorage.removeItem('token')
      navigate('/login')
    }
  }

  /*MenuUnfoldOutlined*/
  //控制侧边栏收缩的事件处理函数
  const handleChangeCollapsed = () => {
    props.changeIsCollapsed()
  }

  return (
    <Header
      style={{
        padding: '0 16px',
        background: colorBgContainer
      }}
    >
      {props.isCollapsed ? <MenuUnfoldOutlined className="trigger" onClick={handleChangeCollapsed} /> : <MenuFoldOutlined className="trigger" onClick={handleChangeCollapsed} />}

      <div style={{ float: 'right', color: '#0F294D', fontSize: '15px' }}>
        <span>
          欢迎 <span style={{ color: '#0086F6' }}>{props.currentUsername}</span> 回来！
        </span>
        <Dropdown
          menu={{
            items,
            onClick
          }}
        >
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
}

//redux
const mapStateToProps = state => {
  return {
    isCollapsed: state.CollapsedReducer.isCollapsed,
    currentUsername: state.CurrentUsernameReducer.currentUsername
  }
}

const mapDispatchToProps = {
  changeIsCollapsed: () => {
    return {
      type: 'change-collapsed'
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader)
