import { useQuery } from '@tanstack/react-query'
import { api } from 'configs/api'
import { Category } from 'types/category'
import { PaginationResult } from 'types/getList'

export type CategoryListResponse = {
  data: {
    content: Category[]
  } & PaginationResult
}

export interface CategoryListParams {
  name?: string
  size?: number
  page?: number
}

export async function getCategoryList(params: CategoryListParams) {
  return (
    (
      await api.get<CategoryListResponse>('/public/category/list_search', {
        params,
      })
    ).data.data ?? null
  )
}

/** Lấy danh sách thể loại GET /categories */
export default function useGetCategoryList(params: CategoryListParams) {
  return useQuery({
    queryKey: ['categoryList', params.name, params.size, params.page],
    queryFn: async () => await getCategoryList(params),
  })
}
