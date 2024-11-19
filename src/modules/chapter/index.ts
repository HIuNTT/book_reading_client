import { api } from "configs/api"
import { ChapterItem, ChapterPayload } from "types/chapter"
import { PaginationResult } from "types/getList"

export type ChapterListResponse = {
  data: {
    content: ChapterItem[]
  } & PaginationResult
}

export interface UpdateChapterDto extends ChapterPayload {
  id?: number;
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

export async function createChapter(bookId: number, data: UpdateChapterDto) {
  const queryParams = `?bookId=${bookId}`; 
  return (await api.post(`/chapter/create${queryParams}`, data)).data;
}

export async function updateChapter(bookId: number, data: UpdateChapterDto) {
  const queryParams = `?bookId=${bookId}`; 
  return (await api.put(`/chapter/update${queryParams}`, data)).data;
}

export async function deleteChapter(chapterId: number) {
  return await api.delete(`/chapter/delete/${chapterId}`)
}