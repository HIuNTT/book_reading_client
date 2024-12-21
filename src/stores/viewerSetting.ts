import { FontFamily, ThemeSpace } from 'constants/viewerLayout'
import { max, min } from 'lodash'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ViewerSettingState {
  spaceColor: ThemeSpace
  fontFamily: FontFamily
  fontSize: number
  lineGap: number
  incFontSize: () => void
  decFontSize: () => void
  incLineGap: () => void
  decLineGap: () => void
  setFontFamily: (fontFamily: FontFamily) => void
  setSpaceColor: (spaceColor: ThemeSpace) => void
  reset: () => void
}

const defaultViewerSettingState: Pick<ViewerSettingState, 'spaceColor' | 'fontFamily' | 'fontSize' | 'lineGap'> = {
  spaceColor: 'White',
  fontFamily: 'Literata',
  fontSize: 4,
  lineGap: 2,
}

export const useViewerSetting = create<ViewerSettingState>()(
  persist(
    (set, state) => ({
      ...defaultViewerSettingState,
      incFontSize: () => set({ fontSize: min([state().fontSize + 1, 9]) }),
      decFontSize: () => set({ fontSize: max([state().fontSize - 1, 1]) }),
      incLineGap: () => set({ lineGap: min([state().lineGap + 1, 5]) }),
      decLineGap: () => set({ lineGap: max([state().lineGap - 1, 1]) }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setSpaceColor: (spaceColor) => set({ spaceColor }),
      reset: () => set({ ...defaultViewerSettingState }),
    }),
    {
      name: 'viewer_settings',
    },
  ),
)
