import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

/*redux*/
import { connect } from 'react-redux'

import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import IsLogin from './IsLogin'
import ShoppingBox from '../pages/shoppingbox/ShoppingBox'

import Commodities from '../pages/shoppingbox/shopping/Commodities'
import CommodityDetails from '../pages/shoppingbox/shopping/CommodityDetails'
import Order from '../pages/shoppingbox/shopping/Order'
import Pay from '../pages/shoppingbox/shopping/Pay'
import PaySucc from '../pages/shoppingbox/shopping/PaySucc'
import OrderDetail from '../pages/shoppingbox/shopping/OrderDetail'
import DeleteSucc from '../pages/shoppingbox/shopping/DeleteSucc'
import Comment from '../pages/shoppingbox/shopping/Comment'

import Home from '../pages/shoppingbox/home/Home'
import TopUp from '../pages/shoppingbox/home/TopUp'

import ManageUsers from '../pages/shoppingbox/manage/ManageUsers'
import ManageOrders from '../pages/shoppingbox/manage/ManageOrders'

import RegisterCheck from '../pages/shoppingbox/supermanager/RegisterCheck'

import NotFound from '../pages/shoppingbox/notfound/NotFound'

const IndexRouter = props => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/"
          element={
            <IsLogin>
              <ShoppingBox />
            </IsLogin>
          }
        >
          {props.currentRole === 0 && <Route index element={<RegisterCheck />}></Route>}
          {/* 非超级管理员登录成功跳转到/时，默认显示购物界面 */}
          {props.currentRole !== 0 && <Route index element={<Commodities />}></Route>}

          {props.currentRole !== 0 && (
            <>
              <Route path="shopping" element={<Commodities />}></Route>
              <Route path="shopping/commodity-details/:id" element={<CommodityDetails />}></Route>
              <Route path="shopping/order/:roomId" element={<Order />}></Route>
              <Route path="shopping/pay/:orderId" element={<Pay />}></Route>
              <Route path="shopping/pay-succ/:orderId" element={<PaySucc />}></Route>
              <Route path="shopping/order-detail/:orderId" element={<OrderDetail />}></Route>
              <Route path="shopping/delete-succ" element={<DeleteSucc />}></Route>
              <Route path="shopping/comment/:orderId" element={<Comment />}></Route>
              <Route path="my/home" element={<Home />}></Route>
              <Route path="my/topup/:userId" element={<TopUp />}></Route>
            </>
          )}

          {props.currentRole === 1 && (
            <>
              <Route path="management/users" element={<ManageUsers />}></Route>
              <Route path="management/orders" element={<ManageOrders />}></Route>
            </>
          )}

          {props.currentRole === 0 && <Route path="registercheck" element={<RegisterCheck />}></Route>}
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  )
}

//redux
const mapStateToProps = state => {
  return {
    currentRole: state.CurrentRoleReducer.currentRole
  }
}

export default connect(mapStateToProps)(IndexRouter)
