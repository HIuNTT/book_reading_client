import { useMutation } from '@tanstack/react-query'
import { api } from 'configs/api'

export interface LoginDto {
  /** Email/Tên đăng nhập/Số điện thoại */
  username: string
  /** Mật khẩu */
  password: string
}

export interface LoginResponse {
  data: {
    access_token: string
    refresh_token: string
  }
}

async function authLogin(data: LoginDto) {
  return (await api.post<LoginResponse>('/public/login', data)).data
}

export function useAuthLogin() {
  return useMutation({
    mutationFn: authLogin,
  })
}
