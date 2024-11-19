import { useQuery } from "@tanstack/react-query"
import { api } from "configs/api"
import { BookItem, BookPayload } from "types/book"
import { PaginationResult } from "types/getList"

export type BookListResponse = {
  data: {
    content: BookItem[]
  } & PaginationResult
}

export interface UpdateBookDto extends BookPayload {
  id?: number;
}

export interface BookListParams {
  title?: string | null;
  status?: string | null;
  authorId?: number | null;
  categoryId?: number | null;
  size?: number;
  page?: number;
}

export interface BookInfoResponse {
  data: Omit<BookItem, 'id'>
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
  });
  return response.data; 2
}