import { ThemeConfig } from 'antd'
import { themeColor, type ThemeColor } from 'styles/theme'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: ThemeColor
  themeConfig: ThemeConfig
  toggleTheme: (theme: ThemeColor) => void
}

const defaultThemeState: Omit<ThemeState, 'toggleTheme'> = {
  theme: 'dark',
  themeConfig: themeColor['dark'],
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      ...defaultThemeState,
      toggleTheme: (theme) => set({ theme, themeConfig: themeColor[theme] }),
    }),
    {
      name: 'theme',
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)
