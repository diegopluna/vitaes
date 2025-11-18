import { Page, Document, View } from '@react-pdf/renderer'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { Header } from './header'
import {
  isListSection,
  isTaxonomySection,
  isTextSection,
  isTimelineSection,
  type IResume,
} from '@vitaes/types/resume'
import { createStyles } from './styles'
import './fonts'
import { Footer } from './footer'
import { Section } from './section'
import { Paragraph } from './paragraph'
import { Entry } from './entry'
import { Items } from './items'
import { Subsection } from './subsection'
import { Taxonomy } from './taxonomy'
import { ListItems } from './list-items'

export const ModernTemplate = ({ value }: { value: IResume }) => {
  const styles = createStyles(value.config.themeColor)

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
            {isTextSection(section) && (
              <Paragraph content={section.content} styles={styles} />
            )}

            {isTimelineSection(section) && (
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

            {isListSection(section) && (
              <>
                {section.structure.type === 'grouped' ? (
                  section.structure.subsections.map((subsection) => (
                    <Subsection
                      key={subsection.id}
                      title={subsection.title}
                      styles={styles}
                    >
                      <ListItems items={subsection.items} styles={styles} />
                    </Subsection>
                  ))
                ) : section.structure.type === 'flat' ? (
                  <ListItems items={section.structure.items} styles={styles} />
                ) : null}
              </>
            )}

            {isTaxonomySection(section) && (
              <Taxonomy categories={section.categories} styles={styles} />
            )}
          </Section>
        ))}
        <Footer
          left={value.config.footerLeft}
          center={value.config.footerCenter}
          right={value.config.footerRight}
          styles={styles}
        />
      </Page>
    </Document>
  )
}
