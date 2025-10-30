export const colors = {
  // Gray-scale colors
  white: '#FFFFFF',
  black: '#000000',
  darkgray: '#333333',
  gray: '#5D5D5D',
  lightgray: '#999999',

  // Basic colors
  green: '#C2E15F',
  orange: '#FDA333',
  purple: '#D3A4F9',
  red: '#FB4485',
  blue: '#6CE0F1',

  // Text colors
  darktext: '#414141',
  text: '#333333',
  graytext: '#5D5D5D',
  lighttext: '#999999',

  // Awesome colors
  'awesome-emerald': '#00A388',
  'awesome-skyblue': '#0395DE',
  'awesome-red': '#DC3522',
  'awesome-pink': '#EF4089',
  'awesome-orange': '#FF6138',
  'awesome-nephritis': '#27AE60',
  'awesome-concrete': '#95A5A6',
  'awesome-darknight': '#131A28',
} as const

export type ColorKey = keyof typeof colors
export type AwesomeColor =
  | 'awesome-emerald'
  | 'awesome-skyblue'
  | 'awesome-red'
  | 'awesome-pink'
  | 'awesome-orange'
  | 'awesome-nephritis'
  | 'awesome-concrete'
  | 'awesome-darknight'
