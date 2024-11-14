import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from 'configs/api'
import { BookItem } from 'types/book'
import { PageParams, PaginationResult } from 'types/getList'

export interface BookListParams {
  title?: string
  status?: string
  authorId?: number
  categoryId?: number
  size?: number
  page?: number
}

export type BookListResponse = {
  data: {
    content: BookItem[]
  } & PaginationResult
}

export async function getBookList(params: BookListParams) {
  return (
    (
      await api.get<BookListResponse>('/public/book/list_search', {
        params,
      })
    ).data.data ?? null
  )
}

/** Lấy danh sách sách GET /books (Infinite Scroll) */
// Mỗi khi enabled đổi từ false sang true, query sẽ được fetch lại để đảm bảo dữ liệu là mới nhất, bất kể queryKey có thay đổi hay không
export default function useGetBookList(params: Omit<BookListParams, 'page'>, enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: ['bookList', params.size, params.status, params.authorId, params.categoryId, params.title],
    queryFn: async ({ pageParam }) =>
      await getBookList({
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
