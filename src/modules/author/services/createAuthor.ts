import { useMutation } from '@tanstack/react-query'
import { api } from 'configs/api'

export interface AuthorDto {
  name: string
}

async function createAuthor(data: AuthorDto) {
  return (await api.post('/author/create', data)).data
}

/** Thêm tác giả mới POST /author/create */
export function useCreateAuthor() {
  return useMutation({
    mutationFn: createAuthor,
  })
}
