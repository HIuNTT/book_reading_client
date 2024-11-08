import { api } from 'configs/api'
import { useMutation } from '@tanstack/react-query'
import { AuthorDto } from './createAuthor'

export interface UpdateAuthorDto extends AuthorDto {
  id: number
}

async function updateAuthor(data: UpdateAuthorDto) {
  return (await api.put('/author/update', data)).data
}

/** Cập nhật tác giả PUT /author/update */
export function useUpdateAuthor() {
  return useMutation({
    mutationFn: updateAuthor,
  })
}
