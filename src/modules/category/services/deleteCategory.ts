import { useMutation } from '@tanstack/react-query'
import { api } from 'configs/api'

async function deleteCategory(categoryId: number) {
  return await api.delete(`/category/delete/${categoryId}`)
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: deleteCategory,
  })
}
