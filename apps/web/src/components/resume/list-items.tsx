import { View, Text } from '@react-pdf/renderer'
import type { ListItem } from '@vitaes/types/resume'
import type { Styles } from './styles'

interface ListItemsProps {
  items: ListItem[]
  styles: Styles
}

export const ListItems = ({ items, styles }: ListItemsProps) => {
  return (
    <View style={styles.honorsContainer}>
      {items.map((item, idx) => (
        <View key={idx} style={styles.honorRow}>
          <Text style={styles.honorDate}>{item.date}</Text>
          <View style={styles.honorContent}>
            <Text>
              <Text style={styles.honorPosition}>{item.position}</Text>
              <Text style={styles.honorTitle}>, {item.title}</Text>
            </Text>
          </View>
          <Text style={styles.honorLocation}>{item.location}</Text>
        </View>
      ))}
    </View>
  )
}
