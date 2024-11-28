import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from 'configs/api'
import { Comment } from 'types/comment'
import { PageParams, PaginationResult } from 'types/getList'

export type CommentListResponse = {
  data: {
    content: Comment[]
  } & PaginationResult
}

export interface CommentListParams {
  chapterId: number
  page?: number
  size?: number
  sort?: string
}

export interface ReplyCommentListParams extends Omit<CommentListParams, 'chapterId'> {
  parentId: number
}

export async function getCommentList(params: CommentListParams) {
  return (await api.get<CommentListResponse>('/public/comment/list', { params })).data.data
}

/** Lấy danh sách bình luận GET /public/comment/list (cuộn vô hạn) */
export function useGetCommentList(params: CommentListParams) {
  return useInfiniteQuery({
    queryKey: ['commentList', params.size, params.sort, params.page, params.chapterId],
    queryFn: async ({ pageParam }) =>
      await getCommentList({ ...params, size: params.size ?? 10, page: pageParam.page }),
    initialPageParam: { page: 1 } as PageParams,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return

      if (lastPage.is_last) return

      return {
        page: lastPage.number + 1,
      }
    },
    gcTime: 0,
  })
}

export async function getReplyCommentList(params: ReplyCommentListParams) {
  return (await api.get<CommentListResponse>('/public/comment/list_reply', { params })).data.data
}

/** Lấy danh sách trả lời bình luận GET /public/comment/list_reply (cuộn vô hạn) */
export function useGetReplyCommentList(params: ReplyCommentListParams, enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: ['replyCommentList', params.size, params.sort, params.page, params.parentId],
    queryFn: async ({ pageParam }) =>
      await getReplyCommentList({ ...params, size: params.size ?? 10, page: pageParam.page }),
    initialPageParam: { page: 1 } as PageParams,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return

      if (lastPage.is_last) return

      return {
        page: lastPage.number + 1,
      }
    },
    gcTime: 0,
    enabled,
  })
}
