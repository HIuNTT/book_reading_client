import { Layout } from 'antd'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <Layout className="min-h-screen w-full bg-white">
      <Header />
      <Outlet />
      <Footer />
    </Layout>
  )
}
