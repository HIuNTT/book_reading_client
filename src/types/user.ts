export interface Role {
  name: string
}

export interface User {
  id: number
  email: string
  name: string
  username: string
  phone: string
  birthday: string
  gender: string
  avatarUrl: string
  role: Role
}

export interface UserTokens {
  accessToken: string
  refreshToken: string
}
