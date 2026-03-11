import { Document, Page, View } from '@react-pdf/renderer'

import type { ResumeDocument } from '../../../convex/shared/resume'
import type { ResumeTemplateDefinition } from '../../../convex/shared/template'
import { ReactPdfRenderNodeTree } from './renderers/react-pdf/react-pdf-adapter'
import { createReactPdfTemplateStyles } from './renderers/react-pdf/react-pdf-styles'
import { planRenderDocument } from './template-compiler/plan-render-document'
import { resolveTemplateDocument } from './template-compiler/resolve-template-document'

type PlaygroundPdfDocumentProps = {
  document: ResumeDocument
  template: ResumeTemplateDefinition
}

export function PlaygroundPdfDocument({
  document,
  template,
}: PlaygroundPdfDocumentProps) {
  const resolvedDocument = resolveTemplateDocument({ document, template })
  const plannedDocument = planRenderDocument(resolvedDocument)
  const styles = createReactPdfTemplateStyles(plannedDocument.template)
  const { header, sidebar, main, footer } = plannedDocument.regions
  const hasSidebar = sidebar.length > 0

  return (
    <Document title={plannedDocument.title}>
      <Page size={plannedDocument.template.page.size} style={styles.page}>
        {header.length > 0 ? (
          <View style={styles.header}>
            <ReactPdfRenderNodeTree
              nodes={header}
              path="header"
              styles={styles}
            />
          </View>
        ) : null}

        <View
          style={[styles.content, hasSidebar ? styles.columns : styles.stack]}
        >
          {hasSidebar ? (
            <View style={styles.sidebar}>
              <ReactPdfRenderNodeTree
                nodes={sidebar}
                path="sidebar"
                styles={styles}
              />
            </View>
          ) : null}

          <View style={hasSidebar ? styles.main : styles.stack}>
            <ReactPdfRenderNodeTree nodes={main} path="main" styles={styles} />
          </View>
        </View>

        {footer.length > 0 ? (
          <View style={styles.footer}>
            <ReactPdfRenderNodeTree
              nodes={footer}
              path="footer"
              styles={styles}
            />
          </View>
        ) : null}
      </Page>
    </Document>
  )
}
