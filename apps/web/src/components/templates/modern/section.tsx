import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import type { Styles } from './styles'
import { colors } from '@vitaes/types/colors'

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
  const inlineStyles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    titleText: {
      marginRight: 8,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: colors.lighttext,
      opacity: 0.3,
    },
  })

  return (
    <View style={styles.section}>
      <View style={inlineStyles.titleContainer}>
        <Text style={[styles.sectionTitle, inlineStyles.titleText]}>
          {title}
        </Text>
        <View style={inlineStyles.line} />
      </View>
      {children}
    </View>
  )
}
