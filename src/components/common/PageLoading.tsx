import { Spin } from 'antd'
import { Icon } from '@iconify/react'

export default function PageLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spin size="large" indicator={<Icon icon="eos-icons:loading" />} />
    </div>
  )
}
