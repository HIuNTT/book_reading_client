import { useQuery } from '@tanstack/react-query'
import { api } from 'configs/api'
import { BookHistory } from 'types/book'
import { PaginationResult } from 'types/getList'

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
