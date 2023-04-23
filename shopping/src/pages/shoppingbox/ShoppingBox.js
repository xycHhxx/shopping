import React from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from '../../components/shoppingbox/SideMenu.js'
import TopHeader from '../../components/shoppingbox/TopHeader.js'

import './ShoppingBox.css'

/*antd */
import { Layout, theme } from 'antd'
const { Content } = Layout

export default function ShoppingBox() {
  /*antd*/
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <div className="shoppingBox">
      <Layout>
        <SideMenu></SideMenu>
        <Layout className="site-layout">
          <TopHeader></TopHeader>
          {/* 页面上根据路由匹配动态渲染的部分,先占位 */}
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              overflow: 'auto'
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
