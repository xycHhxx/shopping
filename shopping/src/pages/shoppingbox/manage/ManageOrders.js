import React from 'react'
import styles from './ManageOrders.module.css'

import OrderListForManage from '../../../components/shoppingbox/manage/OrderListForManage'

/*antd*/
import { Tabs } from 'antd'

export default function ManageOrders() {
  /*antd*/
  /*Tabs*/
  const items = [
    {
      key: '1',
      label: `全部订单`,
      children: <OrderListForManage orderState={6} />
    },
    {
      key: '2',
      label: `待付款`,
      children: <OrderListForManage orderState={0} />
    },
    {
      key: '3',
      label: `未出行`,
      children: <OrderListForManage orderState={1} />
    },
    {
      key: '4',
      label: `待评价`,
      children: <OrderListForManage orderState={2} />
    }
  ]

  return (
    <div className={styles.biggestContainer}>
      <div className={styles.header}>预订纪录</div>
      <div className={styles.listContainer}>
        <Tabs defaultActiveKey="1" items={items} tabBarGutter="44px"></Tabs>
      </div>
    </div>
  )
}
