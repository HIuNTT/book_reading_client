export type PaginationResult = {
  number: number
  size: number
  number_of_elements: number
  is_first: boolean
  is_last: boolean
  total_pages: number
  total_elements: number
  sort: string[]
}

export type PageParams = {
  page: number
}
