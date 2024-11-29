import { useQuery } from '@tanstack/react-query'
import { api } from 'configs/api'
import { Chapter, ChapterItem, ChapterPayload } from 'types/chapter'
import { PaginationResult } from 'types/getList'

export type ChapterListResponse = {
  data: {
    content: ChapterItem[]
  } & PaginationResult
}

export interface UpdateChapterDto extends ChapterPayload {
  id?: number
}

export interface ChapterListParams {
  bookId: number | null
  size?: number
  page?: number
}

export interface GetChapterParams {
  bookId: number
  order: number
}

export interface GetChapterResponse {
  data: Chapter
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
  const queryParams = `?bookId=${bookId}`
  return (await api.post(`/chapter/create${queryParams}`, data)).data
}

export async function updateChapter(bookId: number, data: UpdateChapterDto) {
  const queryParams = `?bookId=${bookId}`
  return (await api.put(`/chapter/update${queryParams}`, data)).data
}

export async function deleteChapter(chapterId: number) {
  return await api.delete(`/chapter/delete/${chapterId}`)
}

export async function getChapter(params: GetChapterParams) {
  return (await api.get<GetChapterResponse>('/public/chapter/get', { params })).data.data
}

export function useGetChapter(params: GetChapterParams, enabled?: boolean) {
  return useQuery({
    queryKey: ['getChapter', params.bookId, params.order],
    queryFn: async () => await getChapter(params),
    enabled,
  })
}
