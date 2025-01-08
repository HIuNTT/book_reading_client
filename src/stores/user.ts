import { ERole } from 'enums/role'
import { User, UserTokens } from 'types/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  tokens: UserTokens
  user: User
  setTokens: (tokens: UserTokens) => void
  setUser: (user: Partial<User>) => void
  clear: () => void
}

const defaultUserState: Pick<UserState, 'tokens' | 'user'> = {
  tokens: { accessToken: '', refreshToken: '' },
  user: {
    id: NaN,
    email: '',
    name: '',
    username: '',
    phone: '',
    birthday: '',
    gender: '',
    avatar_url: '',
    role: {
      id: NaN,
      name: ERole.USER,
    },
  },
}

export const useUser = create<UserState>()(
  persist(
    (set, state) => ({
      ...defaultUserState,
      setTokens: (tokens) => set({ tokens }),
      setUser: (user) => set({ user: { ...state().user, ...user } }),
      clear: () => set({ ...defaultUserState }),
    }),
    {
      name: 'user',
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => ['tokens'].includes(key))),
    },
  ),
)
