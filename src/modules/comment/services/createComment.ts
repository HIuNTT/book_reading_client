import { useMutation } from '@tanstack/react-query'
import { api } from 'configs/api'
import { Comment } from 'types/comment'

export interface CommentDto {
  /** chapterId */
  chapter_id: number
  comment: string
}

export interface ReplyCommentDto extends CommentDto {
  id: number
}

export interface CommentResponse {
  data: Omit<Comment, 'parent_id'>
}

export async function createComment(data: CommentDto) {
  return (await api.post<CommentResponse>('/comment/create', data)).data.data
}

export function useCreateComment() {
  return useMutation({
    mutationFn: createComment,
  })
}

export async function createReplyComment(data: ReplyCommentDto) {
  return (await api.post<CommentResponse>('/comment/create_reply', data)).data.data
}

export function useCreateReplyComment() {
  return useMutation({
    mutationFn: createReplyComment,
  })
}
