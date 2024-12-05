import { ThemeConfig } from 'antd'

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#ff2f7f',
    colorTextBase: '#11181c',
    colorTextPlaceholder: 'rgba(17,24,28,0.7)',
    borderRadius: 8,
    borderRadiusLG: 12,
    screenXXL: 1680,
    screenLG: 1024,
  },
  components: {
    Input: {
      paddingBlock: 9,
      paddingInline: 12,
      paddingBlockLG: 11,
      paddingInlineLG: 12,
    },
    Button: {
      paddingBlockSM: 13,
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
