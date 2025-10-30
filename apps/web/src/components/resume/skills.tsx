import { View, Text } from '@react-pdf/renderer'
import type { Styles } from './styles'
import type { SkillItem } from './types'

interface SkillsProps {
  skills: SkillItem[]
  styles: Styles
}

export const Skills = ({ skills, styles }: SkillsProps) => {
  return (
    <View style={styles.skillsContainer}>
      {skills.map((skill) => (
        <View key={skill.id} style={styles.skillRow}>
          <Text style={styles.skillType}>{skill.type}</Text>
          <Text style={styles.skillSet}>{skill.skills.join(', ')}</Text>
        </View>
      ))}
    </View>
  )
}
