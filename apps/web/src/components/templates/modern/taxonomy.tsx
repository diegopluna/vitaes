import { View, Text } from '@react-pdf/renderer'
import type { CategoryItem } from '@vitaes/types/resume'
import type { Styles } from './styles'

interface TaxonomyProps {
  categories: CategoryItem[]
  styles: Styles
}

export const Taxonomy = ({ categories, styles }: TaxonomyProps) => {
  return (
    <View style={styles.skillsContainer}>
      {categories.map((category) => (
        <View key={category.id} style={styles.skillRow}>
          <Text style={styles.skillType}>{category.type}</Text>
          <Text style={styles.skillSet}>{category.items.join(', ')}</Text>
        </View>
      ))}
    </View>
  )
}
