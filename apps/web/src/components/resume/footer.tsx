import { View, Text } from '@react-pdf/renderer'
import type { Styles } from './styles'

interface FooterProps {
  left: string
  center: string
  right: string
  styles: Styles
}

export const Footer = ({ left, center, right, styles }: FooterProps) => {
  return (
    <View style={styles.footer} fixed>
      <Text>{left}</Text>
      <Text>{center}</Text>
      <Text>{right}</Text>
    </View>
  )
}
