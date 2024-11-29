import { useMutation } from '@tanstack/react-query'
import { api } from 'configs/api'

export interface DeleteCommentDto {
  id: number
}

export async function deleteComment(data: DeleteCommentDto) {
  return await api.delete('/comment/delete', { params: data })
}

export function useDeleteComment() {
  return useMutation({
    mutationFn: deleteComment,
  })
}
