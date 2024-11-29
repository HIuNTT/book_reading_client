import { BookItem } from './book'

export interface ChapterItem {
  id: number
  title: string
  order_chap: number
  book: BookItem
  file_url: string
}

export interface ChapterPayload {
  title?: string
  order_chap?: number
  file_key?: string
}

export interface Chapter extends ChapterItem {
  order_next: number
  order_previous: number
}
