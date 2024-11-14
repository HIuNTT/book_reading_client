import { api } from 'configs/api'
import { BookItem } from 'types/book'

export interface UpdateBookDto extends BookDto {
  id: number
}

export interface BookDto {
  title?: string
  summary?: string
  thumbnail?: string
  author_id?: number
  category_book?: [
    {
      category_id?: number
    },
  ]
}

export interface BookInfoResponse {
  data: Omit<BookItem, 'id'>
}

export async function createBook(data: BookDto) {
  return (await api.post('/book/create', data)).data
}

export async function updateCategory(data: UpdateBookDto) {
  return (await api.put('/book/update', data)).data
}

export async function deleteBook(bookId: number) {
  return await api.delete(`/book/${bookId}`)
}

export async function getBookInfo(bookId: number) {
  return (await api.get<BookInfoResponse>(`/public/book/info/${bookId}`)).data.data
}
