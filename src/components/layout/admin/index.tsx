import { Layout } from 'antd'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Logo from './Logo'
import { Suspense, useState } from 'react'
import PageLoading from 'components/common/PageLoading'
import MenuComponent from './Menu'

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout className="flex h-screen">
      <Layout.Sider width={220} className="bg-white" collapsed={collapsed} collapsible trigger={null}>
        <Logo collapsed={collapsed} />
        <MenuComponent collapsed={collapsed} />
      </Layout.Sider>
      <Layout>
        <Header toggle={toggle} collapsed={collapsed} />
        <Layout.Content className="overflow-auto px-4 pt-6">
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
