import { ThemeConfig } from 'antd'

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#ff2f7f',
    colorTextBase: '#11181C',
  },
  components: {
    Input: {
      paddingBlock: 9,
      paddingInline: 12,
    },
    Button: {
      paddingBlock: 19,
      paddingInline: 16,
      paddingBlockLG: 23,
      paddingInlineLG: 24,
    },
  },
}
