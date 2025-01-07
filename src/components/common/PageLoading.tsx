import { ConfigProvider, Layout, Spin } from 'antd'
import { Icon } from '@iconify/react'
import { useTheme } from 'stores/theme'

export default function PageLoading() {
  const { themeConfig } = useTheme()

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout>
        <div className="flex h-screen items-center justify-center">
          <Spin size="large" indicator={<Icon icon="eos-icons:loading" />} />
        </div>
      </Layout>
    </ConfigProvider>
  )
}
