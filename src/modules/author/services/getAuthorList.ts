import { useQuery } from '@tanstack/react-query'
import { api } from 'configs/api'
import { Author } from 'types/author'
import { PaginationResult } from 'types/getList'

export type AuthorListResponse = {
  data: {
    content: Author[]
  } & PaginationResult
}

export interface AuthorListParams {
  name?: string
  size?: number
  page?: number
}

export async function getAuthorList(params?: AuthorListParams) {
  return (
    (
      await api.get<AuthorListResponse>('/public/author/list_search', {
        params,
      })
    ).data.data ?? null
  )
}

/** Lấy danh sách tác giả GET /author/list_search */
export default function useGetAuthorList(params?: AuthorListParams) {
  return useQuery({
    queryKey: ['authorList'],
    queryFn: async () => await getAuthorList(params),
  })
}
