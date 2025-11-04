import { Font } from '@react-pdf/renderer'

// Register Roboto Variable Font with explicit weight variations
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: '/fonts/Roboto-Regular.ttf',
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      src: '/fonts/Roboto-Italic.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
    {
      src: '/fonts/Roboto-Bold.ttf',
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      src: '/fonts/Roboto-BoldItalic.ttf',
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    {
      src: '/fonts/Roboto-Thin.ttf',
      fontWeight: 'thin',
      fontStyle: 'normal',
    },
    {
      src: '/fonts/Roboto-ThinItalic.ttf',
      fontWeight: 'thin',
      fontStyle: 'italic',
    },
    {
      src: '/fonts/Roboto-Medium.ttf',
      fontWeight: 'medium',
      fontStyle: 'normal',
    },
    {
      src: '/fonts/Roboto-MediumItalic.ttf',
      fontWeight: 'medium',
      fontStyle: 'italic',
    },
    {
      src: '/fonts/Roboto-Light.ttf',
      fontWeight: 'light',
      fontStyle: 'normal',
    },
    {
      src: '/fonts/Roboto-LightItalic.ttf',
      fontWeight: 'light',
      fontStyle: 'italic',
    },
  ],
})

// Register Source Sans 3 Variable Font with explicit weight variations
Font.register({
  family: 'Source Sans Pro',
  fonts: [
    {
      src: '/fonts/SourceSans3-Regular.ttf',
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      src: '/fonts/SourceSans3-It.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
    {
      src: '/fonts/SourceSans3-Bold.ttf',
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      src: '/fonts/SourceSans3-BoldIt.ttf',
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    {
      src: '/fonts/SourceSans3-Light.ttf',
      fontWeight: 'light',
      fontStyle: 'normal',
    },
    {
      src: '/fonts/SourceSans3-LightIt.ttf',
      fontWeight: 'light',
      fontStyle: 'italic',
    },
    {
      src: '/fonts/SourceSans3-SemiBold.ttf',
      fontWeight: 'semibold',
      fontStyle: 'normal',
    },
    {
      src: '/fonts/SourceSans3-SemiBoldIt.ttf',
      fontWeight: 'semibold',
      fontStyle: 'italic',
    },
  ],
})
// Export font families for reference
export const fonts = {
  roboto: 'Roboto',
  sourceSansPro: 'Source Sans Pro',
} as const

// Export available font weights for type safety
export const fontWeights = {
  thin: 100,
  extraLight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
} as const
