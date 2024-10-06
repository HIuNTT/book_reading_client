import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider } from 'antd'
import PageLoading from 'components/common/PageLoading'
import { queryClient } from 'configs/queryClient'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from 'routes'
import { themeConfig } from 'styles/theme'

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={themeConfig} componentSize="middle">
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<PageLoading />}>
            <Routes />
          </Suspense>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
