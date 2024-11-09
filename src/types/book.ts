import { Author } from "./author"

export interface BookItem {
  id?: number,
  title?: string,
  summary?: string,
  avg_rating?: number,
  thumbnail_url?: string,
  view?: number,
  status?: string,
  created_at?: string,
  updated_at?: string,
  author: Author,
  category_book: [
    {
      category_id: number,
      category_name: string
    }
  ]
}
