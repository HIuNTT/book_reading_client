import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider } from 'antd'
import PageLoading from 'components/common/PageLoading'
import { queryClient } from 'configs/queryClient'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from 'routes'
import { Toaster } from 'sonner'
import { themeConfig } from 'styles/theme'
import vi_VN from 'antd/locale/vi_VN'

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={themeConfig} componentSize="middle" locale={vi_VN}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<PageLoading />}>
            <Routes />
          </Suspense>
          <ReactQueryDevtools />
          <Toaster richColors position="bottom-right" closeButton />
        </QueryClientProvider>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
