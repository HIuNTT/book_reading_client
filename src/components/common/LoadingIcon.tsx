import { Icon } from '@iconify/react'
import { Spin } from 'antd'

export default function LoadingIcon() {
  return (
    <div className="flex h-full min-h-[100px] w-full items-center justify-center">
      <Spin size="large" indicator={<Icon icon="eos-icons:loading" />} />
    </div>
  )
}
