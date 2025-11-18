import { View, Text } from '@react-pdf/renderer'
import type { Styles } from './styles'

interface ItemsProps {
  items: string[]
  styles: Styles
}

export const Items = ({ items, styles }: ItemsProps) => {
  return (
    <View style={styles.items}>
      {items.map((item) => (
        <View key={item} style={styles.item}>
          <Text style={styles.itemBullet}>•</Text>
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}
    </View>
  )
}
