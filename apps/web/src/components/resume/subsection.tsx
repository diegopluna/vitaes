import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import type { Styles } from './styles'

interface SubsectionProps {
  title: string
  children: React.ReactNode
  styles: Styles
}

export const Subsection = ({ title, children, styles }: SubsectionProps) => {
  return (
    <View style={styles.subsection}>
      <Text style={styles.subsectionTitle}>{title}</Text>
      {children}
    </View>
  )
}
