import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import type { Styles } from './styles'
import { colors } from '@vitaes/types/colors'

interface SectionProps {
  title: string
  children: React.ReactNode
  styles: Styles
  highlight?: boolean
}

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  styles,
  highlight = true,
}) => {
  const inlineStyles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end', // Align to baseline
      // marginBottom: '2.5mm',
    },
    titleText: {
      paddingRight: 2,
    },
    line: {
      flex: 1,
      height: 0.9,
      backgroundColor: colors.gray,
      marginBottom: 7, // Adjust to align with text baseline
    },
  })

  const firstThreeChars = title.substring(0, 3)
  const restOfTitle = title.substring(3)
  return (
    <View style={styles.section}>
      <View style={inlineStyles.titleContainer}>
        <Text style={[styles.sectionTitle, inlineStyles.titleText]}>
          {highlight ? (
            <>
              <Text style={styles.sectionTitleHighlight}>
                {firstThreeChars}
              </Text>
              <Text>{restOfTitle}</Text>
            </>
          ) : (
            title
          )}
        </Text>
        <View style={inlineStyles.line} />
      </View>
      {children}
    </View>
  )
}
