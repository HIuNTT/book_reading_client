import { api } from 'configs/api'
import { Category } from 'types/category'

export interface CategoryInfoResponse {
  data: Omit<Category, 'id'>
}

export async function getCategory(categoryId: number) {
  return (await api.get<CategoryInfoResponse>(`/category/${categoryId}`)).data.data
}
