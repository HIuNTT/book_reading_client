import { api } from 'configs/api'
import { Author } from 'types/author'

export interface AuthorInfoResponse {
  data: Omit<Author, 'id'>
}

export async function getAuthor(authorId: number) {
  return (await api.get<AuthorInfoResponse>(`/public/author/info/${authorId}`)).data.data
}
