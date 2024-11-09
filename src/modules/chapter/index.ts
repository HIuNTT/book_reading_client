import { api } from "configs/api"
import { ChapterItem } from "types/chapter"
import { PaginationResult } from "types/getList"

export type ChapterListResponse = {
  data: {
    content: ChapterItem[]
  } & PaginationResult
}

export interface ChapterListParams {
  bookId: number | null;
  size?: number;
  page?: number;
}

export async function getChapterList(params?: ChapterListParams) {
  return (
    (
      await api.get<ChapterListResponse>('/public/chapter/list', {
        params,
      })
    ).data.data ?? null
  )
}