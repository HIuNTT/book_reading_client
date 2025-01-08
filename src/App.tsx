import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PageLoading from 'components/common/PageLoading'
import { queryClient } from 'configs/queryClient'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from 'routes'
import { Toaster } from 'sonner'
import ScrollToTop from 'components/common/ScrollToTop'
import { StyleProvider } from '@ant-design/cssinjs'

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App
