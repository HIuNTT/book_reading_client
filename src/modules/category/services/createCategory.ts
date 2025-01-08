import { useMutation } from '@tanstack/react-query'
import { api } from 'configs/api'

export interface CategoryDto {
  name: string
}

async function createCategory(data: CategoryDto) {
  return (await api.post('/category/create', data)).data
}

/** Thêm thể loại mới POST /api/categories */
export function useCreateCategory() {
  return useMutation({
    mutationFn: createCategory,
  })
}
