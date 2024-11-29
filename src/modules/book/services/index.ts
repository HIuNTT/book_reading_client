import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { api, apiRecommend } from 'configs/api'
import { BookItem, BookPayload, RecommendedBook } from 'types/book'
import { PageParams, PaginationResult } from 'types/getList'

export type BookListResponse = {
  data: {
    content: BookItem[]
  } & PaginationResult
}

export interface UpdateBookDto extends BookPayload {
  id?: number
}

export interface BookListParams {
  title?: string | null
  status?: string | null
  authorId?: number | null
  categoryId?: number | null
  size?: number
  page?: number
  sort?: string
}

export interface BookInfoResponse {
  data: Omit<BookItem, 'id'>
}

export interface RecommendedBookListDto {
  user_id: number
  top_n?: number
}

export interface RecommendedBookListResponse {
  user_id: number
  recommended_books: RecommendedBook[]
}

export async function getBookList(params?: BookListParams) {
  return (
    (
      await api.get<BookListResponse>('/public/book/list_search', {
        params,
      })
    ).data.data ?? null
  )
}

export async function createBook(data: BookPayload) {
  return (await api.post('/book/create', data)).data
}

export async function updateBook(data: UpdateBookDto) {
  return (await api.put('/book/update', data)).data
}

export async function deleteBook(bookId: number) {
  return await api.delete(`/book/delete/${bookId}`)
}

export async function getBookInfo(bookId: number) {
  return (await api.get<BookInfoResponse>(`/public/book/info/${bookId}`)).data.data
}

/** Lấy danh sách thể loại GET /books */
export default function useGetBookList(params?: BookListParams) {
  return useQuery({
    queryKey: ['bookList'],
    queryFn: async () => await getBookList(params),
  })
}

export async function postFile(formData: FormData) {
  const response = await api.post('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

/** Lấy danh sách sách GET /books (Infinite Scroll) */
// Mỗi khi enabled đổi từ false sang true, query sẽ được fetch lại để đảm bảo dữ liệu là mới nhất, bất kể queryKey có thay đổi hay không
export function useGetBookListInfinite(params: Omit<BookListParams, 'page'>, enabled?: boolean) {
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

export async function getRecommendedBookList(data: RecommendedBookListDto) {
  return (await apiRecommend.post<RecommendedBookListResponse>('/recommend/', data)).data.recommended_books
}

/** Lấy danh sách sách được recommend POST /recommend */
export function useGetRecommendedBookList({ user_id, top_n = 30 }: RecommendedBookListDto, enabled?: boolean) {
  return useQuery({
    queryKey: ['recommendedBookList', user_id],
    queryFn: async () => await getRecommendedBookList({ user_id, top_n }),
    enabled,
  })
}
