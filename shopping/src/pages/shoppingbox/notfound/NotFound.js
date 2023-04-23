import React from 'react'

/*antd*/
import { Button, Result } from 'antd'

export default function NotFound() {
  //返回上级页面
  const handleBack = () => {
    window.history.back()
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，您访问的页面不存在！"
      extra={
        <Button
          type="primary"
          onClick={() => {
            handleBack()
          }}
        >
          返回
        </Button>
      }
    />
  )
}
