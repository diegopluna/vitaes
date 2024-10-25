import { Resume } from '@/@types/resume'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

export type GenericResumeProps = {
  resume: Resume
}

export const GenericResume = ({ resume }: GenericResumeProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{resume.basics.name}</Text>
        </View>
      </Page>
    </Document>
  )
}
