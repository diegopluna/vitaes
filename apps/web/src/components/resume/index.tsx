import { Page, Document, View } from '@react-pdf/renderer'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { Header } from './header'
import {
  isEntriesSection,
  isHonorsSection,
  isParagraphSection,
  isSkillsSection,
  type IResume,
} from './types'
import { createStyles } from './styles'
import './fonts'
import { Footer } from './footer'
import { Section } from './section'
import { Paragraph } from './paragraph'
import { Entry } from './entry'
import { Items } from './items'
import { Subsection } from './subsection'
import { Skills } from './skills'
import { Honors } from './honors'

export const ResumePDF = ({ value }: { value: IResume }) => {
  const styles = createStyles(value.config.themeColor)

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Document>
      <Page size={value.config.pageSize} style={styles.page}>
        <Header
          info={value.personalInfo}
          styles={styles}
          align={value.config.headerAlign}
        />
        {value.sections.map((section) => (
          <Section
            key={section.id}
            title={section.title}
            styles={styles}
            highlight={value.config.sectionColorHighlight}
          >
            {isParagraphSection(section) && (
              <Paragraph content={section.content} styles={styles} />
            )}

            {isEntriesSection(section) && (
              <View style={styles.entriesContainer}>
                {section.entries.map((entry) => (
                  <Entry key={entry.id} data={entry} styles={styles}>
                    {entry.items && (
                      <Items items={entry.items} styles={styles} />
                    )}
                  </Entry>
                ))}
              </View>
            )}

            {isHonorsSection(section) && (
              <>
                {section.subsections ? (
                  section.subsections.map((subsection) => (
                    <Subsection
                      key={subsection.id}
                      title={subsection.title}
                      styles={styles}
                    >
                      <Honors honors={subsection.honors} styles={styles} />
                    </Subsection>
                  ))
                ) : section.honors ? (
                  <Honors honors={section.honors} styles={styles} />
                ) : null}
              </>
            )}

            {isSkillsSection(section) && (
              <Skills skills={section.skills} styles={styles} />
            )}
          </Section>
        ))}
        <Footer
          left={today}
          center={`${value.personalInfo.firstName} ${value.personalInfo.lastName} · Résumé`}
          right="1"
          styles={styles}
        />
      </Page>
    </Document>
  )
}
