import { api } from 'configs/api'
import { CategoryDto } from './createCategory'
import { useMutation } from '@tanstack/react-query'

export interface UpdateCategoryDto extends CategoryDto {
  id: number
}

async function updateCategory(data: UpdateCategoryDto) {
  return (await api.put('/category/update', data)).data
}

/** Cập nhật thể loại PUT /api/categories/:id */
export function useUpdateCategory() {
  return useMutation({
    mutationFn: updateCategory,
  })
}
