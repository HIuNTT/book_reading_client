import { useMutation } from '@tanstack/react-query'
import { api } from 'configs/api'

export interface LikeCommentDto {
  commentId: number
  like: boolean
}

export async function likeComment({ commentId, ...data }: LikeCommentDto) {
  return await api.post('/like', data, { params: { commentId: commentId } })
}

export function useLikeComment() {
  return useMutation({
    mutationFn: likeComment,
  })
}
