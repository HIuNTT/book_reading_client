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
  theme: 'light',
  themeConfig: themeColor['light'],
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
      onRehydrateStorage: () => {
        return (state, error) => {
          if (state?.theme) {
            state.themeConfig = themeColor[state.theme]
          }
          if (error) {
            console.log('an error happened during hydration', error)
          }
        }
      },
    },
  ),
)
