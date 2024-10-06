import { Flex, Spin } from "antd";
import { Icon } from '@iconify/react'

export default function PageLoading() {
  return <Flex justify="center" align="center">
    <Spin tip="Đang tải..." indicator={<Icon icon="eos-icons:loading" />} />
  </Flex>
}
