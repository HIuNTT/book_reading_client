import { ConfigProvider, Layout } from 'antd'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Logo from './Logo'
import { Suspense, useState } from 'react'
import PageLoading from 'components/common/PageLoading'
import MenuComponent from './Menu'
import { lightThemeConfig } from 'styles/theme'
import vi_VN from 'antd/locale/vi_VN'

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <ConfigProvider theme={lightThemeConfig} locale={vi_VN}>
      <Layout className="flex h-screen">
        <Layout.Sider width={220} className="bg-white" collapsed={collapsed} collapsible trigger={null}>
          <Logo collapsed={collapsed} />
          <MenuComponent collapsed={collapsed} />
        </Layout.Sider>
        <Layout className="bg-[#f5f5f5]">
          <Header toggle={toggle} collapsed={collapsed} />
          <Layout.Content className="overflow-auto">
            <Suspense fallback={<PageLoading />}>
              <Outlet />
            </Suspense>
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
