import { Button, ConfigProvider, Layout, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'stores/theme'

export default function NotFound() {
  const navigate = useNavigate()
  const { themeConfig } = useTheme()

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout className="m-auto flex h-screen flex-col items-center justify-center">
        <div className="mb-[-30px] max-w-[400px]">
          <img src="/img/404-bg.png" alt="404 bg" />
        </div>
        <Typography.Title level={4} className="mb-0 text-center">
          Ối, <br /> trang không tồn tại!
        </Typography.Title>
        <div className="mt-2">
          <Typography.Text className="text-center opacity-45">
            Không tìm thấy trang bạn yêu cầu. <br /> Hy vọng bạn tìm được cách quay lại!
          </Typography.Text>
        </div>
        <div className="mt-8">
          <Button className="min-w-80 max-w-80 font-bold" size="large" type="primary" onClick={() => navigate('/')}>
            Trở Về Trang Chủ
          </Button>
        </div>
      </Layout>
    </ConfigProvider>
  )
}
