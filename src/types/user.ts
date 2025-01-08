import { ERole } from 'enums/role'

export interface Role {
  id: number
  name: ERole
}

export interface User {
  id: number
  email: string
  name: string
  username: string
  phone: string
  birthday: string
  gender: string
  avatar_url: string
  avatar_key: string
  role: Role
}

export interface UserTokens {
  accessToken: string
  refreshToken: string
}
