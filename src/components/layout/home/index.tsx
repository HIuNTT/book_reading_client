import { ConfigProvider, FloatButton, Layout } from 'antd'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { darkThemeConfig } from 'styles/theme'

export default function MainLayout() {
  return (
    <ConfigProvider theme={darkThemeConfig}>
      <Layout className="min-h-screen w-full">
        <Header />
        <Layout.Content>
          <Outlet />
        </Layout.Content>
        <Footer />
        <FloatButton.BackTop
          visibilityHeight={1000}
          style={{ insetInlineEnd: 30, insetBlockEnd: 50, width: '46px', height: '46px' }}
        />
      </Layout>
    </ConfigProvider>
  )
}
