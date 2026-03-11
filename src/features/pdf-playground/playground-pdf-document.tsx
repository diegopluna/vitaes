import { Document, Link, Page, Text, View } from '@react-pdf/renderer'

import type {
  AwardsSection,
  CertificationsSection,
  CustomSection,
  EducationSection,
  GenericEntry,
  LanguagesSection,
  PublicationsSection,
  ResumeDocument,
  SkillsSection,
} from '../../../convex/shared/resume'
import type {
  TemplateBasicsBlock,
  ResumeTemplateDefinition,
  TemplateSectionBlock,
} from '../../../convex/shared/template'
import {
  createReactPdfTemplateStyles,
  getReactPdfBasicsStyle,
  getReactPdfSummaryContainerStyle,
  getReactPdfSummaryTextStyle,
  resolveReactPdfTextStyle,
  styleList,
} from './renderers/react-pdf/react-pdf-styles'
import { resolveTemplateDocument } from './template-compiler/resolve-template-document'
import type {
  ResolvedTemplateBlock,
  ResolvedTemplateDocument,
} from './template-compiler/resolved-template-document'

type PlaygroundPdfDocumentProps = {
  document: ResumeDocument
  template: ResumeTemplateDefinition
}

type TemplateStyles = ReturnType<typeof createReactPdfTemplateStyles>

export function PlaygroundPdfDocument({
  document,
  template,
}: PlaygroundPdfDocumentProps) {
  const resolvedDocument = resolveTemplateDocument({ document, template })
  const styles = createReactPdfTemplateStyles(resolvedDocument.template)
  const { header, sidebar, main, footer } = resolvedDocument.regions
  const hasSidebar = sidebar.length > 0

  return (
    <Document title={resolvedDocument.title}>
      <Page size={resolvedDocument.template.page.size} style={styles.page}>
        {header.length > 0 ? (
          <View style={styles.header}>
            {header.map((block, index) => (
              <RenderBlock
                key={`header-${index}`}
                block={block}
                resolvedDocument={resolvedDocument}
                styles={styles}
              />
            ))}
          </View>
        ) : null}

        <View
          style={[styles.content, hasSidebar ? styles.columns : styles.stack]}
        >
          {hasSidebar ? (
            <View style={styles.sidebar}>
              {sidebar.map((block, index) => (
                <RenderBlock
                  key={`sidebar-${index}`}
                  block={block}
                  resolvedDocument={resolvedDocument}
                  styles={styles}
                />
              ))}
            </View>
          ) : null}

          <View style={hasSidebar ? styles.main : styles.stack}>
            {main.map((block, index) => (
              <RenderBlock
                key={`main-${index}`}
                block={block}
                resolvedDocument={resolvedDocument}
                styles={styles}
              />
            ))}
          </View>
        </View>

        {footer.length > 0 ? (
          <View style={styles.footer}>
            {footer.map((block, index) => (
              <RenderBlock
                key={`footer-${index}`}
                block={block}
                resolvedDocument={resolvedDocument}
                styles={styles}
              />
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  )
}

type RenderBlockProps = {
  block: ResolvedTemplateBlock
  resolvedDocument: ResolvedTemplateDocument
  styles: TemplateStyles
}

function RenderBlock({ block, resolvedDocument, styles }: RenderBlockProps) {
  switch (block.type) {
    case 'basics':
      return (
        <RenderBasics
          block={block.block}
          document={resolvedDocument}
          styles={styles}
        />
      )
    case 'summary':
      return (
        <View
          style={getReactPdfSummaryContainerStyle(block.variant, styles)}
          minPresenceAhead={36}
        >
          <SectionHeading title={block.title} styles={styles} />
          <Text style={getReactPdfSummaryTextStyle(block.variant, styles)}>
            {block.content}
          </Text>
        </View>
      )
    case 'entry-section':
      return (
        <View style={styles.section} minPresenceAhead={48}>
          <SectionHeading title={block.title} styles={styles} />
          <View style={styles.entryList}>
            {block.section.items.map((item) => (
              <RenderEntry
                key={item.id}
                item={item}
                variant={block.variant}
                styles={styles}
              />
            ))}
          </View>
        </View>
      )
    case 'education-section':
      return (
        <RenderEducation
          section={block.section}
          title={block.title}
          variant={block.variant}
          styles={styles}
        />
      )
    case 'skills-section':
      return (
        <RenderSkills
          section={block.section}
          title={block.title}
          variant={block.variant}
          styles={styles}
        />
      )
    case 'languages-section':
      return (
        <RenderLanguages
          section={block.section}
          title={block.title}
          variant={block.variant}
          styles={styles}
        />
      )
    case 'certifications-section':
      return (
        <RenderCertifications
          section={block.section}
          title={block.title}
          variant={block.variant}
          styles={styles}
        />
      )
    case 'awards-section':
      return (
        <RenderAwards
          section={block.section}
          title={block.title}
          variant={block.variant}
          styles={styles}
        />
      )
    case 'publications-section':
      return (
        <RenderPublications
          section={block.section}
          title={block.title}
          variant={block.variant}
          styles={styles}
        />
      )
    case 'custom-section':
      return (
        <RenderCustom
          section={block.section}
          title={block.title}
          variant={block.variant}
          styles={styles}
        />
      )
    case 'divider':
      return <View style={styles.divider} />
    case 'spacer':
      return <View style={{ height: block.size }} />
    case 'text':
      return (
        <Text
          style={resolveReactPdfTextStyle(styles, block.style, block.align)}
        >
          {block.content}
        </Text>
      )
    case 'group':
      return (
        <View
          style={{
            flexDirection: block.layout === 'row' ? 'row' : 'column',
            gap: block.gap ?? resolvedDocument.template.theme.spacing.md,
          }}
        >
          {block.children.map((child, index) => (
            <RenderBlock
              key={`group-${index}`}
              block={child}
              resolvedDocument={resolvedDocument}
              styles={styles}
            />
          ))}
        </View>
      )
    default:
      return null
  }
}

function RenderBasics({
  block,
  document,
  styles,
}: {
  block: TemplateBasicsBlock
  document: ResolvedTemplateDocument
  styles: TemplateStyles
}) {
  const hasProfiles =
    block.showProfiles !== false && document.basics.profiles.length > 0
  const hasContacts =
    !!document.basics.location ||
    !!document.basics.email ||
    !!document.basics.phone

  const metaContent = (
    <View
      style={styleList(
        styles.basicsMeta,
        block.variant === 'hero' && styles.basicsMetaHero,
        block.variant === 'sidebar' && styles.basicsMetaSidebar,
      )}
    >
      {document.basics.location ? (
        <Text style={styles.metaText}>{document.basics.location}</Text>
      ) : null}
      {document.basics.email ? (
        <Text style={styles.metaText}>{document.basics.email}</Text>
      ) : null}
      {document.basics.phone ? (
        <Text style={styles.metaText}>{document.basics.phone}</Text>
      ) : null}
      {hasProfiles ? (
        <View
          style={styleList(
            styles.profileRow,
            block.variant === 'hero' && styles.profileRowHero,
            block.variant === 'sidebar' && styles.profileRowSidebar,
          )}
        >
          {document.basics.profiles.map((profile) =>
            profile.url ? (
              <Link
                key={profile.id}
                src={profile.url}
                style={styles.profileLink}
              >
                {profile.label}
              </Link>
            ) : (
              <Text key={profile.id} style={styles.metaText}>
                {profile.label}
              </Text>
            ),
          )}
        </View>
      ) : null}
    </View>
  )

  return (
    <View style={getReactPdfBasicsStyle(block.variant, block.align, styles)}>
      <View style={styles.basicsHeading}>
        <Text style={styles.name}>{document.basics.fullName}</Text>
        {block.showHeadline !== false && document.basics.headline ? (
          <Text style={styles.headline}>{document.basics.headline}</Text>
        ) : null}
      </View>
      {hasContacts || hasProfiles ? metaContent : null}
    </View>
  )
}

function RenderEntry({
  item,
  variant,
  styles,
}: {
  item: GenericEntry
  variant: Extract<
    TemplateSectionBlock,
    { section: 'experience' | 'projects' | 'volunteering' }
  >['variant']
  styles: TemplateStyles
}) {
  if (variant === 'compact-list') {
    return (
      <View style={styles.entryCompact}>
        <View style={styles.entryCompactHeader}>
          <Text style={styles.entryCompactTitle}>
            {[item.title, item.organization].filter(Boolean).join(', ')}
          </Text>
          {item.dateRange?.display ? (
            <Text style={styles.entryMeta}>{item.dateRange.display}</Text>
          ) : null}
        </View>
        {item.summary ? (
          <Text style={styles.compactText}>{item.summary}</Text>
        ) : null}
      </View>
    )
  }

  return (
    <View
      wrap={variant !== 'cards'}
      style={styleList(
        styles.entryCard,
        variant === 'cards' && styles.entryCardSurface,
        variant === 'timeline' && styles.entryTimeline,
      )}
    >
      <View style={styles.entryHeader}>
        <View style={styles.entryHeading}>
          <Text style={styles.entryTitle}>{item.title}</Text>
          {item.organization ? (
            <Text style={styles.entryOrganization}>{item.organization}</Text>
          ) : null}
        </View>
        {item.dateRange?.display ? (
          <Text style={styles.entryMeta}>{item.dateRange.display}</Text>
        ) : null}
      </View>
      {item.subtitle || item.location ? (
        <Text style={styles.entrySubtitle}>
          {[item.subtitle, item.location].filter(Boolean).join(' · ')}
        </Text>
      ) : null}
      {item.summary ? (
        <Text style={styles.bodyText}>{item.summary}</Text>
      ) : null}
      {item.highlights.length > 0 ? (
        <View style={styles.bulletList}>
          {item.highlights.map((highlight, index) => (
            <View
              key={`hl-${index}`}
              style={styleList(
                styles.bulletRow,
                index !== item.highlights.length - 1 && styles.bulletRowSpacing,
              )}
            >
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bodyText}>{highlight}</Text>
            </View>
          ))}
        </View>
      ) : null}
      {item.tags.length > 0 ? (
        <View style={styles.tagRow}>
          {item.tags.map((tag, index) => (
            <Text
              key={`tag-${index}`}
              style={styleList(
                styles.tagChip,
                index !== item.tags.length - 1 && styles.inlineChipSpacing,
              )}
            >
              {tag}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  )
}

function RenderEducation({
  section,
  title,
  variant,
  styles,
}: {
  section: EducationSection
  title: string
  variant: Extract<TemplateSectionBlock, { section: 'education' }>['variant']
  styles: TemplateStyles
}) {
  return (
    <View style={styles.section} minPresenceAhead={40}>
      <SectionHeading title={title} styles={styles} />
      <View style={styles.entryList}>
        {section.items.map((item) => (
          <View
            key={item.id}
            style={
              variant === 'compact-list'
                ? styles.entryCompact
                : styles.entryCard
            }
          >
            <View style={styles.entryHeader}>
              <View style={styles.entryHeading}>
                <Text style={styles.entryTitle}>{item.institution}</Text>
                <Text style={styles.entryOrganization}>
                  {[item.studyType, item.area].filter(Boolean).join(', ')}
                </Text>
              </View>
              {item.dateRange?.display ? (
                <Text style={styles.entryMeta}>{item.dateRange.display}</Text>
              ) : null}
            </View>
            {item.location ? (
              <Text style={styles.entrySubtitle}>{item.location}</Text>
            ) : null}
            {item.summary ? (
              <Text
                style={
                  variant === 'compact-list'
                    ? styles.compactText
                    : styles.bodyText
                }
              >
                {item.summary}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  )
}

function RenderSkills({
  section,
  title,
  variant,
  styles,
}: {
  section: SkillsSection
  title: string
  variant: Extract<TemplateSectionBlock, { section: 'skills' }>['variant']
  styles: TemplateStyles
}) {
  const flatItems = section.groups.flatMap((group) => group.items)

  return (
    <View style={styles.section} minPresenceAhead={40}>
      <SectionHeading title={title} styles={styles} />
      {variant === 'badges' ? (
        <View style={styles.badgeWrap}>
          {flatItems.map((item, index) => (
            <Text
              key={`badge-${index}`}
              style={styleList(
                styles.badgeChip,
                index !== flatItems.length - 1 && styles.inlineChipSpacing,
              )}
            >
              {item}
            </Text>
          ))}
        </View>
      ) : variant === 'compact-list' ? (
        <View style={styles.compactList}>
          {section.groups.map((group) => (
            <Text key={group.id} style={styles.compactText}>
              <Text style={styles.compactLabel}>{group.name}: </Text>
              {group.items.join(', ')}
            </Text>
          ))}
        </View>
      ) : (
        <View style={styles.skillGroups}>
          {section.groups.map((group, index) => (
            <View
              key={group.id}
              style={styleList(
                styles.skillGroup,
                index !== section.groups.length - 1 && styles.groupSpacing,
              )}
            >
              <Text style={styles.skillGroupName}>{group.name}</Text>
              {group.items.map((item, itemIndex) => (
                <Text key={`skill-${itemIndex}`} style={styles.skillItem}>
                  {item}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

function RenderLanguages({
  section,
  title,
  variant,
  styles,
}: {
  section: LanguagesSection
  title: string
  variant: Extract<TemplateSectionBlock, { section: 'languages' }>['variant']
  styles: TemplateStyles
}) {
  return (
    <View style={styles.section} minPresenceAhead={32}>
      <SectionHeading title={title} styles={styles} />
      {variant === 'badges' ? (
        <View style={styles.badgeWrap}>
          {section.items.map((item, index) => (
            <Text
              key={item.id}
              style={styleList(
                styles.badgeChip,
                index !== section.items.length - 1 && styles.inlineChipSpacing,
              )}
            >
              {item.proficiency
                ? `${item.name} · ${item.proficiency}`
                : item.name}
            </Text>
          ))}
        </View>
      ) : (
        <View
          style={
            variant === 'compact-list'
              ? styles.compactList
              : styles.languageList
          }
        >
          {section.items.map((item, index) => (
            <View
              key={item.id}
              style={styleList(
                styles.languageRow,
                index !== section.items.length - 1 && styles.rowSpacing,
              )}
            >
              <Text style={styles.bodyText}>{item.name}</Text>
              {item.proficiency ? (
                <Text style={styles.entryMeta}>{item.proficiency}</Text>
              ) : null}
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

function RenderCertifications({
  section,
  title,
  variant,
  styles,
}: {
  section: CertificationsSection
  title: string
  variant: Extract<
    TemplateSectionBlock,
    { section: 'certifications' }
  >['variant']
  styles: TemplateStyles
}) {
  return (
    <View style={styles.section} minPresenceAhead={36}>
      <SectionHeading title={title} styles={styles} />
      <View
        style={
          variant === 'compact-list' ? styles.compactList : styles.entryList
        }
      >
        {section.items.map((item) => (
          <View
            key={item.id}
            style={
              variant === 'compact-list'
                ? styles.entryCompact
                : styles.entryCard
            }
          >
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>{item.name}</Text>
              {item.dateRange?.display ? (
                <Text style={styles.entryMeta}>{item.dateRange.display}</Text>
              ) : null}
            </View>
            {item.issuer ? (
              <Text style={styles.entryOrganization}>{item.issuer}</Text>
            ) : null}
            {item.summary ? (
              <Text
                style={
                  variant === 'compact-list'
                    ? styles.compactText
                    : styles.bodyText
                }
              >
                {item.summary}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  )
}

function RenderAwards({
  section,
  title,
  variant,
  styles,
}: {
  section: AwardsSection
  title: string
  variant: Extract<TemplateSectionBlock, { section: 'awards' }>['variant']
  styles: TemplateStyles
}) {
  return (
    <View style={styles.section} minPresenceAhead={36}>
      <SectionHeading title={title} styles={styles} />
      <View
        style={
          variant === 'compact-list' ? styles.compactList : styles.entryList
        }
      >
        {section.items.map((item) => (
          <View
            key={item.id}
            style={
              variant === 'compact-list'
                ? styles.entryCompact
                : styles.entryCard
            }
          >
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>{item.title}</Text>
              {item.date ? (
                <Text style={styles.entryMeta}>{item.date}</Text>
              ) : null}
            </View>
            {item.issuer ? (
              <Text style={styles.entryOrganization}>{item.issuer}</Text>
            ) : null}
            {item.summary ? (
              <Text
                style={
                  variant === 'compact-list'
                    ? styles.compactText
                    : styles.bodyText
                }
              >
                {item.summary}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  )
}

function RenderPublications({
  section,
  title,
  variant,
  styles,
}: {
  section: PublicationsSection
  title: string
  variant: Extract<TemplateSectionBlock, { section: 'publications' }>['variant']
  styles: TemplateStyles
}) {
  return (
    <View style={styles.section} minPresenceAhead={36}>
      <SectionHeading title={title} styles={styles} />
      <View
        style={
          variant === 'compact-list' ? styles.compactList : styles.entryList
        }
      >
        {section.items.map((item) => (
          <View
            key={item.id}
            style={
              variant === 'compact-list'
                ? styles.entryCompact
                : styles.entryCard
            }
          >
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>{item.title}</Text>
              {item.date ? (
                <Text style={styles.entryMeta}>{item.date}</Text>
              ) : null}
            </View>
            {item.publisher ? (
              <Text style={styles.entryOrganization}>{item.publisher}</Text>
            ) : null}
            {item.summary ? (
              <Text
                style={
                  variant === 'compact-list'
                    ? styles.compactText
                    : styles.bodyText
                }
              >
                {item.summary}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  )
}

function RenderCustom({
  section,
  title,
  variant,
  styles,
}: {
  section: CustomSection
  title: string
  variant: Extract<TemplateSectionBlock, { section: 'custom' }>['variant']
  styles: TemplateStyles
}) {
  return (
    <View style={styles.section} minPresenceAhead={36}>
      <SectionHeading title={title} styles={styles} />
      <View
        style={variant === 'compact' ? styles.compactList : styles.entryList}
      >
        {section.blocks.map((block) => {
          switch (block.type) {
            case 'text':
              return (
                <View key={block.id} style={styles.entryCard}>
                  {block.title ? (
                    <Text style={styles.entryTitle}>{block.title}</Text>
                  ) : null}
                  <Text
                    style={
                      variant === 'compact'
                        ? styles.compactText
                        : styles.bodyText
                    }
                  >
                    {block.content}
                  </Text>
                </View>
              )
            case 'list':
              return (
                <View key={block.id} style={styles.entryCard}>
                  {block.title ? (
                    <Text style={styles.entryTitle}>{block.title}</Text>
                  ) : null}
                  {block.items.map((item, index) => (
                    <Text key={`li-${index}`} style={styles.compactText}>
                      • {item}
                    </Text>
                  ))}
                </View>
              )
            case 'entries':
              return (
                <View key={block.id} style={styles.entryList}>
                  {block.items.map((item) => (
                    <RenderEntry
                      key={item.id}
                      item={item}
                      variant="stacked"
                      styles={styles}
                    />
                  ))}
                </View>
              )
            default:
              return null
          }
        })}
      </View>
    </View>
  )
}

function SectionHeading({
  title,
  styles,
}: {
  title: string
  styles: TemplateStyles
}) {
  return (
    <View style={styles.sectionHeading} minPresenceAhead={24}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
  )
}
