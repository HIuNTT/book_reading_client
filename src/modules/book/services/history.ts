import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { api } from 'configs/api'
import { BookHistory } from 'types/book'
import { PageParams, PaginationResult } from 'types/getList'

export type BookHistoryListResponse = {
  data: {
    content: BookHistory[]
  } & PaginationResult
}

export interface BookHistoryListParams {
  page?: number
  size?: number
}

export async function saveHistory(chapterId: number) {
  return await api.post('/history', undefined, { params: { chapterId } })
}

export async function getBookHistoryList(params: BookHistoryListParams) {
  return (await api.get<BookHistoryListResponse>('/book/list_history', { params })).data.data
}

export function useGetBookHistoryList(params: BookHistoryListParams, enabled?: boolean) {
  return useQuery({
    queryKey: ['bookHistoryList', params.page, params.size],
    queryFn: () => getBookHistoryList(params),
    enabled,
  })
}

export function useGetBookHistoryInfinite(params: BookHistoryListParams, enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: ['bookHistoryListInfinite', params.size, params.page],
    queryFn: async ({ pageParam }) =>
      await getBookHistoryList({
        ...params,
        page: pageParam.page,
      }),
    initialPageParam: { page: 1 } as PageParams,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return

      if (lastPage.is_last) return

      return {
        page: lastPage.number + 1,
      }
    },
    enabled,
  })
}
