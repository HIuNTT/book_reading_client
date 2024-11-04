import { useQuery } from '@tanstack/react-query'
import { api } from 'configs/api'
import { Category } from 'types/category'

export interface CategoryListResponse {
  data: Category[]
}

export interface CategoryListParams {
  name?: string
  size?: number
  page?: number
}

async function getCategoryList(params?: CategoryListParams) {
  return (
    (
      await api.get<CategoryListResponse>('/category/list_search', {
        params,
      })
    ).data.data ?? null
  )
}

/** Lấy danh sách thể loại GET /categories */
export default function useGetCategoryList(params?: CategoryListParams) {
  return useQuery({
    queryKey: ['categoryList'],
    queryFn: async () => await getCategoryList(params),
  })
}
