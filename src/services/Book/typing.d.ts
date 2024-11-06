// @ts-ignore
/* eslint-disable */

declare namespace API {
  type BookList = {
    content?: API.BookItem[],
    number?: number,
    size?: number,
    number_of_elements?: number,
    is_first?: boolean,
    is_last?: boolean,
    total_pages?: number,
    total_elements?: number
  };

  type BookItem = {
    id?: number,
    title?: string,
    summary?: string,
    avg_rating?: number,
    thumbnail_url?: string,
    view?: number,
    status?: string,
    created_at?: string,
    updated_at?: string,
    author?: {
      id?: number,
      name?: string,
      created_at?: string,
      updated_at?: string
    },
    category_book?: [
      {
        category_id?: number,
        category_name?: string
      }
    ]
  }

  type PayloadBook = {
    id?: number,
    title?: string,
    summary?: string,
    thumbnail?: string,
    author_id?: number,
    category_book?: [
      {
        category_id?: number
      }
    ]
  }
}
