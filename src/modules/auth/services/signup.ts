import { useMutation } from '@tanstack/react-query'
import { api } from 'configs/api'

export interface SignupDto {
  email: string
  password: string
  rePassword: string
}

export interface SignupResponse {
  accessToken: string
  refreshToken: string
}

async function authSignup(data: SignupDto) {
  return (await api.post<SignupResponse>('/auth/signup', data)).data
}

export function useAuthSignup() {
  return useMutation({
    mutationFn: authSignup,
  })
}
