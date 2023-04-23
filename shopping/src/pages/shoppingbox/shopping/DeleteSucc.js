import React from 'react'
import { useNavigate } from 'react-router-dom'

/*antd*/
import { Button, Result } from 'antd'

export default function DeleteSucc() {
  const navigate = useNavigate()

  //返回首页
  const handleBackShopping = () => {
    navigate('/shopping')
  }

  return (
    <div style={{ marginTop: '60px' }}>
      <Result
        status="success"
        title="订单删除成功！"
        extra={[
          <Button
            type="primary"
            key="commodities"
            onClick={() => {
              handleBackShopping()
            }}
          >
            返回首页
          </Button>
        ]}
      />
    </div>
  )
}
