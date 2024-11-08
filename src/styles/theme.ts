import { ThemeConfig } from 'antd'

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#ff2f7f',
    colorTextBase: '#11181C',
    borderRadius: 8,
    borderRadiusLG: 12,
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
    Card: {
      borderRadiusLG: 6,
    },
    InputNumber: {
      paddingBlock: 9,
      paddingInline: 12,
    },
  },
}
