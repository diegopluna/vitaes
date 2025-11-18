import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import type { Styles } from './styles'

interface SectionProps {
  title: string
  children: React.ReactNode
  styles: Styles
}

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  styles,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}
