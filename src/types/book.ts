import { Author } from './author'

export interface BookItem {
  id: number
  title: string
  summary: string
  avg_rating: number
  thumbnail_url: string
  view: number
  status: string
  created_at: string
  updated_at: string
  author: Author
  category_book: {
    category_id: number
    category_name: string
  }[]
}

export interface RecommendedBook extends Omit<BookItem, 'id'> {
  book_id: number
}

export interface BookPayload {
  title?: string
  summary?: string
  thumbnail_url?: string
  author_id?: number
  category_book?: {
    category_id?: number
  }[]
}
