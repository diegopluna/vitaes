import { Text } from '@react-pdf/renderer'
import type { Styles } from './styles'

interface ParagraphProps {
  content: string
  styles: Styles
}

export const Paragraph = ({ content, styles }: ParagraphProps) => {
  return <Text style={styles.paragraph}>{content}</Text>
}
