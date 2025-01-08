import { api } from "configs/api"
import { FeedbackItem, FeedBackPayload } from "types/feadback"
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

export async function getFeedbackUser(params?: FeedbackListParams) {
  const jsonString = localStorage.getItem("userData");
  const token = jsonString ? JSON.parse(jsonString)?.state?.tokens?.accessToken : null;
  return (
    (
      await api.get<FeedbackItem>('/feedback/get_user_feedback', {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data ?? null
  )
}

export async function createFeedback(bookId:number, data: FeedBackPayload) {
  const jsonString = localStorage.getItem("userData");
  const token = jsonString ? JSON.parse(jsonString)?.state?.tokens?.accessToken : null;
  const queryParams = `?bookId=${bookId}`; 
  return (await api.post(`/feedback/create${queryParams}`, data,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  })).data
}

export async function updateFeedback(bookId:number, data: FeedBackPayload) {
  const jsonString = localStorage.getItem("userData");
  const token = jsonString ? JSON.parse(jsonString)?.state?.tokens?.accessToken : null;
  const queryParams = `?bookId=${bookId}`; 
  return (await api.post(`/feedback/update${queryParams}`, data,{
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  })).data
}