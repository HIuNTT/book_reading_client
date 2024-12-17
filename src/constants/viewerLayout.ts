interface SpaceStyle {
  backgroundColor: string
  color: string
}

const white: SpaceStyle = {
  backgroundColor: '#fff',
  color: '#11181c',
}

const lightGray: SpaceStyle = {
  backgroundColor: '#e0e0e0',
  color: '#11181c',
}

const darkGray: SpaceStyle = {
  backgroundColor: '#222222',
  color: '#bcbcbc',
}

const black: SpaceStyle = {
  backgroundColor: '#000',
  color: '#eeeeee',
}

const sepia: SpaceStyle = {
  backgroundColor: '#f6f1e5',
  color: '#4e3726',
}

const green: SpaceStyle = {
  backgroundColor: '#233e3b',
  color: '#c8d9d7',
}

export const themeSpace = {
  White: white,
  LightGray: lightGray,
  DarkGray: darkGray,
  Black: black,
  Sepia: sepia,
  Green: green,
}

export type ThemeSpace = keyof typeof themeSpace

export const spaceStyle: { label: string; value: ThemeSpace }[] = [
  {
    label: 'White',
    value: 'White',
  },
  {
    label: 'Light Gray',
    value: 'LightGray',
  },
  {
    label: 'Dark Gray',
    value: 'DarkGray',
  },
  {
    label: 'Black',
    value: 'Black',
  },
  {
    label: 'Sepia',
    value: 'Sepia',
  },
  {
    label: 'Green',
    value: 'Green',
  },
]

export type FontFamily = 'Asap' | 'Literata' | 'Merriweather'

export const fontFamilies: { label: string; value: FontFamily }[] = [
  {
    label: 'Asap',
    value: 'Asap',
  },
  {
    label: 'Literata',
    value: 'Literata',
  },
  {
    label: 'Merriweather',
    value: 'Merriweather',
  },
]
