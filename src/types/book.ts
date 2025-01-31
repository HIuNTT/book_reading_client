import { Author } from './author'
import { ChapterHistory, NewChapter } from './chapter'

export interface BookItem {
  id: number
  title: string
  summary: string
  avg_rating: number
  thumbnail_url: string
  banner_url: string
  view: number
  status: string
  created_at: string
  updated_at: string
  author: Author
  category_book: {
    category_id: number
    category_name: string
  }[]
  new_chapter: NewChapter
}

export interface BookHistory extends BookItem {
  chapter_history: ChapterHistory
}

export interface RecommendedBook extends Omit<BookItem, 'id'> {
  book_id: number
}

export interface BookBannerItem extends BookItem {
  banner_url: string
}

export interface BookPayload {
  title?: string
  summary?: string
  thumbnail?: string
  banner?: string
  author_id?: number
  category_book?: {
    category_id?: number
  }[]
}
