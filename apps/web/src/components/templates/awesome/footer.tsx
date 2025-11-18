import { View, Text } from '@react-pdf/renderer'
import type { Styles } from './styles'
import type { FooterOption } from '@vitaes/types/resume'

interface FooterProps {
  left: FooterOption
  center: FooterOption
  right: FooterOption
  pageNumber?: number
  styles: Styles
}

export const Footer = ({ left, center, right, styles }: FooterProps) => {
  const getFooterText = (option: FooterOption, pageNumber: number): string => {
    if (option.showPageNumber) {
      return String(pageNumber)
    }
    return option.text
  }

  return (
    <View
      style={styles.footer}
      fixed
      render={({ pageNumber }) => (
        <>
          <Text>{getFooterText(left, pageNumber)}</Text>
          <Text>{getFooterText(center, pageNumber)}</Text>
          <Text>{getFooterText(right, pageNumber)}</Text>
        </>
      )}
    />
  )
}
