import React from 'react'
import { View, Text } from '@react-pdf/renderer'
import type { Styles } from './styles'
import type { EntryItem } from './types'

interface EntryProps {
  data: EntryItem
  children?: React.ReactNode
  styles: Styles
}

export const Entry = ({ data, children, styles }: EntryProps) => {
  const hasTitle = data.title && data.title.trim() !== ''

  return (
    <View style={styles.entry}>
      {hasTitle ? (
        <>
          <View style={styles.entryHeader}>
            <Text style={styles.entryTitle}>{data.title}</Text>
            <Text style={styles.entryLocation}>{data.location}</Text>
          </View>
          <View style={styles.entrySecondRow}>
            <Text style={styles.entryPosition}>{data.position}</Text>
            <Text style={styles.entryDate}>{data.date}</Text>
          </View>
        </>
      ) : (
        <View style={styles.entryHeader}>
          <Text style={styles.entryPosition}>{data.position}</Text>
          <Text style={styles.entryDate}>{data.date}</Text>
        </View>
      )}

      {data.description && (
        <Text style={styles.entryDescription}>{data.description}</Text>
      )}

      {children}
    </View>
  )
}
