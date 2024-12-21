import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider } from 'antd'
import PageLoading from 'components/common/PageLoading'
import { queryClient } from 'configs/queryClient'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from 'routes'
import { Toaster } from 'sonner'
import vi_VN from 'antd/locale/vi_VN'
import ScrollToTop from 'components/common/ScrollToTop'
import { StyleProvider } from '@ant-design/cssinjs'
import { lightThemeConfig } from 'styles/theme'

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={lightThemeConfig} locale={vi_VN}>
        <StyleProvider layer>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<PageLoading />}>
              <ScrollToTop />
              <Routes />
            </Suspense>
            <ReactQueryDevtools />
            <Toaster richColors position="bottom-right" closeButton />
          </QueryClientProvider>
        </StyleProvider>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
