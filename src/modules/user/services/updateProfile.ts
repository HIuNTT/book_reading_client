import { useMutation } from '@tanstack/react-query'
import { api } from 'configs/api'
import { User } from 'types/user'
import { Dayjs } from 'dayjs'

export interface UpdateProfileDto extends Partial<Omit<User, 'id' | 'username' | 'role' | 'avatar_url' | 'birthday'>> {
  avatar?: string
  birthday?: string | Dayjs
}

export interface UpdateProfileResponse {
  data: User
}

async function updateProfile(data: UpdateProfileDto) {
  return (await api.put<UpdateProfileResponse>('/user/update', data)).data.data
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: updateProfile,
  })
}
