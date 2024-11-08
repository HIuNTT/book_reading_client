import { useMutation } from '@tanstack/react-query'
import { api } from 'configs/api'

export interface SignupDto {
  email: string
  username: string
  password: string
  rePassword: string
}

async function authSignup(data: Omit<SignupDto, 'rePassword'>) {
  return (await api.post('/public/signup', data)).data
}

export function useAuthSignup() {
  return useMutation({
    mutationFn: authSignup,
  })
}
