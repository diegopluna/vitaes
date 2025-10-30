import { View, Text } from '@react-pdf/renderer'
import type { HonorItem } from './types'
import type { Styles } from './styles'

interface HonorsProps {
  honors: HonorItem[]
  styles: Styles
}

export const Honors = ({ honors, styles }: HonorsProps) => {
  return (
    <View style={styles.honorsContainer}>
      {honors.map((honor, idx) => (
        <View key={idx} style={styles.honorRow}>
          <Text style={styles.honorDate}>{honor.date}</Text>
          <View style={styles.honorContent}>
            <Text>
              <Text style={styles.honorPosition}>{honor.position}</Text>
              <Text style={styles.honorTitle}>, {honor.title}</Text>
            </Text>
          </View>
          <Text style={styles.honorLocation}>{honor.location}</Text>
        </View>
      ))}
    </View>
  )
}
