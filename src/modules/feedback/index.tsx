import { api } from "configs/api"
import { FeedbackItem } from "types/feadback"
import { PaginationResult } from "types/getList"

export type FeedbackListResponse = {
  data: {
    content: FeedbackItem[]
  } & PaginationResult
}

export interface FeedbackListParams {
  bookId: number | null
  size?: number
  page?: number
  sort?: string
}

export async function getFeedbackList(params?: FeedbackListParams) {
  return (
    (
      await api.get<FeedbackListResponse>('/public/feedback/list', {
        params,
      })
    ).data.data ?? null
  )
}