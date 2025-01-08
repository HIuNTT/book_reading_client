import { theme, ThemeConfig } from 'antd'

const componentConfig: ThemeConfig = {
  components: {
    Input: {
      paddingBlock: 8,
      paddingInline: 12,
      paddingBlockLG: 11,
      paddingInlineLG: 12,
    },
    Button: {
      paddingBlock: 19,
      paddingInline: 16,
      paddingBlockLG: 23,
      paddingInlineLG: 24,
    },
    InputNumber: {
      paddingBlock: 8,
      paddingInline: 12,
      paddingBlockLG: 11,
      paddingInlineLG: 12,
    },
    DatePicker: {
      controlHeight: 40,
    },
    Select: {
      controlHeight: 40,
    },
  },
}

export const darkThemeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#ff2f7f',
    colorTextPlaceholder: 'rgb(179,179,179)',
    colorText: 'rgb(255,255,255)',
    borderRadiusLG: 12,
    screenXXL: 1680,
    screenLG: 1024,
    colorBgLayout: '#141414',
  },
  components: {
    ...componentConfig.components,
    Layout: {
      headerBg: '#141414',
    },
    Modal: {
      colorIcon: 'rgba(255,255,255,0.45)',
    },
  },
  algorithm: [theme.darkAlgorithm],
}

export const lightThemeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#ff2f7f',
    colorTextBase: '#11181c',
    borderRadiusLG: 12,
    colorBgLayout: '#ffffff',
  },
  components: {
    ...componentConfig.components,
    Layout: {
      headerBg: '#fff',
    },
  },
}

export const themeColor = {
  dark: darkThemeConfig,
  light: lightThemeConfig,
}

export type ThemeColor = keyof typeof themeColor
