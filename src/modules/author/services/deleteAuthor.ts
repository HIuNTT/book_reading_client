import { useMutation } from '@tanstack/react-query'
import { api } from 'configs/api'

async function deleteAuthor(authorId: number) {
  return await api.delete(`/author/delete/${authorId}`)
}

export function useDeleteAuthor() {
  return useMutation({
    mutationFn: deleteAuthor,
  })
}
