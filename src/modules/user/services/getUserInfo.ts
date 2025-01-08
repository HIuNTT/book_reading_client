import { useQuery } from '@tanstack/react-query'
import { api } from 'configs/api'
import { User } from 'types/user'

export interface UserInfoResponse {
  data: User
}

async function getUserInfo() {
  return (await api.get<UserInfoResponse>('/user/info')).data.data
}

export function useGetUserInfo(enabled?: boolean) {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled,
  })
}
