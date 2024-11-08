import { keepPreviousData, QueryClient } from '@tanstack/react-query'
import { ErrorEnum } from 'constants/errorCode'
import { toast } from 'sonner'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      placeholderData: keepPreviousData,
    },
    mutations: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError(error: any) {
        const errorCode = error.response.data.data.error_codes[0] as string
        const errorMessage = ErrorEnum[errorCode as keyof typeof ErrorEnum]
        toast.error(errorMessage || 'Có lỗi xảy ra. Vui lòng thử lại!')
      },
    },
  },
})
