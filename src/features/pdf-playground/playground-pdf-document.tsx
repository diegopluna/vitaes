import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import type { Style } from '@react-pdf/types'

import type {
  AwardsSection,
  CertificationsSection,
  CustomSection,
  EducationSection,
  GenericEntry,
  LanguagesSection,
  PublicationsSection,
  ResumeDocument,
  ResumeSection,
  SkillsSection,
  SummarySection,
} from '../../../convex/shared/resume'
import type {
  ResumeTemplateDefinition,
  TemplateAlign,
  TemplateBlock,
  TemplateSectionBlock,
  TemplateTextStyleRef,
  TemplateVisibilityRule,
} from '../../../convex/shared/template'

type PlaygroundPdfDocumentProps = {
  document: ResumeDocument
  template: ResumeTemplateDefinition
}

type TemplateStyles = ReturnType<typeof createTemplateStyles>

function styleList(...styles: Array<Style | false | null | undefined>) {
  return styles.filter(
    (style): style is Style => style != null && style !== false,
  )
}

export function PlaygroundPdfDocument({
  document,
  template,
}: PlaygroundPdfDocumentProps) {
  const styles = createTemplateStyles(template)
  const summary = findSection(document.sections, 'summary')
  const headerBlocks = filterVisibleBlocks(
    template.regions.header ?? [],
    document.sections,
  )
  const sidebarBlocks = filterVisibleBlocks(
    template.regions.sidebar ?? [],
    document.sections,
  )
  const mainBlocks = filterVisibleBlocks(
    template.regions.main,
    document.sections,
  )
  const footerBlocks = filterVisibleBlocks(
    template.regions.footer ?? [],
    document.sections,
  )
  const hasSidebar = sidebarBlocks.length > 0

  return (
    <Document title={`${document.basics.fullName} Resume`}>
      <Page size={template.page.size} style={styles.page}>
        {headerBlocks.length > 0 ? (
          <View style={styles.header}>
            {headerBlocks.map((block, index) => (
              <RenderBlock
                key={`header-${index}`}
                block={block}
                document={document}
                template={template}
                styles={styles}
                summary={summary}
              />
            ))}
          </View>
        ) : null}

        <View
          style={[styles.content, hasSidebar ? styles.columns : styles.stack]}
        >
          {hasSidebar ? (
            <View style={styles.sidebar}>
              {sidebarBlocks.map((block, index) => (
                <RenderBlock
                  key={`sidebar-${index}`}
                  block={block}
                  document={document}
                  template={template}
                  styles={styles}
                  summary={summary}
                />
              ))}
            </View>
          ) : null}

          <View style={hasSidebar ? styles.main : styles.stack}>
            {mainBlocks.map((block, index) => (
              <RenderBlock
                key={`main-${index}`}
                block={block}
                document={document}
                template={template}
                styles={styles}
                summary={summary}
              />
            ))}
          </View>
        </View>

        {footerBlocks.length > 0 ? (
          <View style={styles.footer}>
            {footerBlocks.map((block, index) => (
              <RenderBlock
                key={`footer-${index}`}
                block={block}
                document={document}
                template={template}
                styles={styles}
                summary={summary}
              />
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  )
}

type RenderBlockProps = {
  block: TemplateBlock
  document: ResumeDocument
  template: ResumeTemplateDefinition
  styles: TemplateStyles
  summary?: SummarySection
}

function RenderBlock({
  block,
  document,
  template,
  styles,
  summary,
}: RenderBlockProps) {
  switch (block.type) {
    case 'basics':
      return <RenderBasics block={block} document={document} styles={styles} />
    case 'summary':
      if (!summary || summary.visible === false || !summary.content.trim()) {
        return null
      }

      return (
        <View
          style={getSummaryContainerStyle(block.variant, styles)}
          minPresenceAhead={36}
        >
          <SectionHeading
            title={block.title ?? summary.title ?? 'Summary'}
            styles={styles}
          />
          <Text style={getSummaryTextStyle(block.variant, styles)}>
            {summary.content}
          </Text>
        </View>
      )
    case 'section':
      return (
        <RenderSectionBlock block={block} document={document} styles={styles} />
      )
    case 'divider':
      return <View style={styles.divider} />
    case 'spacer':
      return <View style={{ height: block.size }} />
    case 'text':
      return (
        <Text style={resolveTextStyle(styles, block.style, block.align)}>
          {block.content}
        </Text>
      )
    case 'group':
      return (
        <View
          style={{
            flexDirection: block.layout === 'row' ? 'row' : 'column',
            gap: block.gap ?? template.theme.spacing.md,
          }}
        >
          {block.children.map((child, index) => (
            <RenderBlock
              key={`group-${index}`}
              block={child}
              document={document}
              template={template}
              styles={styles}
              summary={summary}
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
  block: Extract<TemplateBlock, { type: 'basics' }>
  document: ResumeDocument
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
    <View style={getBasicsStyle(block.variant, block.align, styles)}>
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

function RenderSectionBlock({
  block,
  document,
  styles,
}: {
  block: TemplateSectionBlock
  document: ResumeDocument
  styles: TemplateStyles
}) {
  switch (block.section) {
    case 'experience':
    case 'projects':
    case 'volunteering': {
      const section = findSection(document.sections, block.section)

      if (!section || section.visible === false) {
        return null
      }

      const title = block.title ?? section.title ?? toTitle(section.kind)

      return (
        <View style={styles.section} minPresenceAhead={48}>
          <SectionHeading title={title} styles={styles} />
          <View style={styles.entryList}>
            {section.items.map((item) => (
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
    }
    case 'education': {
      const section = findSection(document.sections, 'education')

      if (!section || section.visible === false) {
        return null
      }

      const title = block.title ?? section.title ?? toTitle(section.kind)

      return (
        <RenderEducation
          section={section}
          title={title}
          variant={block.variant}
          styles={styles}
        />
      )
    }
    case 'skills': {
      const section = findSection(document.sections, 'skills')

      if (!section || section.visible === false) {
        return null
      }

      const title = block.title ?? section.title ?? toTitle(section.kind)

      return (
        <RenderSkills
          section={section}
          title={title}
          variant={block.variant}
          styles={styles}
        />
      )
    }
    case 'languages': {
      const section = findSection(document.sections, 'languages')

      if (!section || section.visible === false) {
        return null
      }

      const title = block.title ?? section.title ?? toTitle(section.kind)

      return (
        <RenderLanguages
          section={section}
          title={title}
          variant={block.variant}
          styles={styles}
        />
      )
    }
    case 'certifications': {
      const section = findSection(document.sections, 'certifications')

      if (!section || section.visible === false) {
        return null
      }

      const title = block.title ?? section.title ?? toTitle(section.kind)

      return (
        <RenderCertifications
          section={section}
          title={title}
          variant={block.variant}
          styles={styles}
        />
      )
    }
    case 'awards': {
      const section = findSection(document.sections, 'awards')

      if (!section || section.visible === false) {
        return null
      }

      const title = block.title ?? section.title ?? toTitle(section.kind)

      return (
        <RenderAwards
          section={section}
          title={title}
          variant={block.variant}
          styles={styles}
        />
      )
    }
    case 'publications': {
      const section = findSection(document.sections, 'publications')

      if (!section || section.visible === false) {
        return null
      }

      const title = block.title ?? section.title ?? toTitle(section.kind)

      return (
        <RenderPublications
          section={section}
          title={title}
          variant={block.variant}
          styles={styles}
        />
      )
    }
    case 'custom': {
      const section = findSection(document.sections, 'custom')

      if (!section || section.visible === false) {
        return null
      }

      const title = block.title ?? section.title ?? toTitle(section.kind)

      return (
        <RenderCustom
          section={section}
          title={title}
          variant={block.variant}
          styles={styles}
        />
      )
    }
    default:
      return null
  }
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

function filterVisibleBlocks(
  blocks: TemplateBlock[],
  sections: ResumeSection[],
) {
  return blocks.filter((block) => {
    if (block.type === 'summary') {
      const summary = findSection(sections, 'summary')
      return !!summary && summary.visible !== false && !!summary.content.trim()
    }

    if (block.type !== 'section' || !block.visibleWhen) {
      return true
    }

    return satisfiesVisibilityRule(sections, block.section, block.visibleWhen)
  })
}

function satisfiesVisibilityRule(
  sections: ResumeSection[],
  sectionKind: ResumeSection['kind'],
  rule: TemplateVisibilityRule,
) {
  const section = sections.find((candidate) => candidate.kind === sectionKind)

  if (!section || section.visible === false) {
    return false
  }

  if (rule.sectionKinds?.length) {
    const visibleKinds = new Set(
      sections
        .filter((candidate) => candidate.visible !== false)
        .map((candidate) => candidate.kind),
    )

    if (!rule.sectionKinds.every((kind) => visibleKinds.has(kind))) {
      return false
    }
  }

  if (typeof rule.minItems === 'number') {
    return getSectionItemCount(section) >= rule.minItems
  }

  return true
}

function getSectionItemCount(section: ResumeSection) {
  switch (section.kind) {
    case 'summary':
      return section.content.trim() ? 1 : 0
    case 'experience':
    case 'projects':
    case 'volunteering':
      return section.items.length
    case 'education':
      return section.items.length
    case 'skills':
      return section.groups.reduce(
        (count, group) => count + group.items.length,
        0,
      )
    case 'certifications':
      return section.items.length
    case 'awards':
      return section.items.length
    case 'languages':
      return section.items.length
    case 'publications':
      return section.items.length
    case 'custom':
      return section.blocks.length
    default:
      return 0
  }
}

function findSection<TKind extends ResumeSection['kind']>(
  sections: ResumeSection[],
  kind: TKind,
) {
  return sections.find((section) => section.kind === kind) as
    | Extract<ResumeSection, { kind: TKind }>
    | undefined
}

function resolveTextStyle(
  styles: TemplateStyles,
  style?: TemplateTextStyleRef,
  align?: TemplateAlign,
) {
  const baseMap: Record<string, Style> = {
    body: styles.bodyText,
    muted: styles.mutedText,
    heading: styles.sectionTitle,
    sectionTitle: styles.sectionTitle,
    meta: styles.entryMeta,
  }

  return {
    ...(baseMap[style ?? 'body'] ?? styles.bodyText),
    ...(align ? { textAlign: align } : {}),
  }
}

function getSummaryContainerStyle(
  variant: 'paragraph' | 'compact' | 'highlight',
  styles: TemplateStyles,
) {
  if (variant === 'highlight') {
    return [styles.section, styles.highlightPanel]
  }

  return styles.section
}

function getSummaryTextStyle(
  variant: 'paragraph' | 'compact' | 'highlight',
  styles: TemplateStyles,
) {
  if (variant === 'compact') {
    return styles.compactText
  }

  return styles.bodyText
}

function getBasicsStyle(
  variant: 'hero' | 'compact' | 'split' | 'sidebar',
  align: 'left' | 'center' | 'right' | undefined,
  styles: TemplateStyles,
) {
  const alignment = align
    ? ({ textAlign: align, alignItems: alignToFlex(align) } as Style)
    : undefined

  switch (variant) {
    case 'hero':
      return styleList(styles.basicsHero, alignment)
    case 'compact':
      return styleList(styles.basicsCompact, alignment)
    case 'sidebar':
      return styleList(styles.basicsSidebar, alignment)
    default:
      return styles.basicsSplit
  }
}

function alignToFlex(align: 'left' | 'center' | 'right') {
  switch (align) {
    case 'center':
      return 'center'
    case 'right':
      return 'flex-end'
    default:
      return 'flex-start'
  }
}

function toTitle(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function createTemplateStyles(template: ResumeTemplateDefinition) {
  const { colors, spacing, typography } = template.theme
  const leftColumn = template.page.columns?.left ?? 1
  const rightColumn = template.page.columns?.right ?? 1

  return StyleSheet.create({
    page: {
      backgroundColor: colors.background ?? '#ffffff',
      color: colors.text,
      fontFamily: template.theme.fonts.body,
      fontSize: typography.baseSize,
      paddingTop: template.page.margins.top,
      paddingRight: template.page.margins.right,
      paddingBottom: template.page.margins.bottom,
      paddingLeft: template.page.margins.left,
    },
    header: {
      marginBottom: spacing.lg,
    },
    content: {},
    columns: {
      flexDirection: 'row',
      gap: template.page.columns?.gap ?? spacing.lg,
      alignItems: 'flex-start',
    },
    stack: {
      flexDirection: 'column',
      gap: spacing.lg,
    },
    sidebar: {
      flexBasis: 0,
      flexGrow: leftColumn,
      gap: spacing.lg,
    },
    main: {
      flexBasis: 0,
      flexGrow: rightColumn,
      gap: spacing.lg,
    },
    footer: {
      marginTop: spacing.lg,
      gap: spacing.xs,
    },
    basicsSplit: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border ?? '#d7e0de',
      paddingBottom: spacing.md,
    },
    basicsHero: {
      gap: spacing.xs,
      borderBottomWidth: 1,
      borderBottomColor: colors.border ?? '#d7e0de',
      paddingBottom: spacing.md,
      alignItems: 'flex-start',
    },
    basicsCompact: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border ?? '#d7e0de',
      paddingBottom: spacing.sm,
    },
    basicsSidebar: {
      gap: spacing.xs,
      padding: spacing.sm,
      backgroundColor: colors.surface ?? '#eef6f4',
    },
    basicsHeading: {
      gap: spacing.xs,
      flexShrink: 1,
    },
    basicsMeta: {
      alignItems: 'flex-end',
      gap: spacing.xs,
      maxWidth: 220,
      flexShrink: 0,
    },
    basicsMetaHero: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      maxWidth: '100%',
    },
    basicsMetaSidebar: {
      alignItems: 'flex-start',
      maxWidth: '100%',
    },
    name: {
      fontFamily: template.theme.fonts.heading,
      fontSize: typography.nameSize ?? 22,
      color: colors.text,
    },
    headline: {
      marginTop: spacing.xs,
      fontSize: typography.headingSize ?? 11,
      color: colors.accent,
    },
    metaText: {
      fontSize: typography.metaSize ?? 8,
      color: colors.muted,
      lineHeight: 1.3,
    },
    profileRow: {
      marginTop: spacing.xs,
      gap: spacing.xs,
      alignItems: 'flex-end',
    },
    profileRowHero: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    profileRowSidebar: {
      alignItems: 'flex-start',
      gap: spacing.xs,
    },
    profileLink: {
      fontSize: typography.metaSize ?? 8,
      color: colors.accent,
      textDecoration: 'none',
    },
    section: {},
    sectionHeading: {
      marginBottom: spacing.sm,
    },
    sectionTitle: {
      fontFamily: template.theme.fonts.heading,
      fontSize: typography.sectionTitleSize ?? 10,
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      color: colors.accent,
    },
    sectionRule: {
      height: 1,
      backgroundColor: colors.border ?? '#d7e0de',
    },
    highlightPanel: {
      padding: spacing.sm,
      backgroundColor: colors.surface ?? '#eef6f4',
    },
    bodyText: {
      fontSize: typography.baseSize,
      lineHeight: typography.lineHeight,
      color: colors.text,
    },
    mutedText: {
      fontSize: typography.baseSize,
      lineHeight: typography.lineHeight,
      color: colors.muted,
    },
    compactText: {
      fontSize: typography.baseSize - 0.5,
      lineHeight: typography.lineHeight,
      color: colors.text,
    },
    compactLabel: {
      fontFamily: template.theme.fonts.heading,
      color: colors.accent,
    },
    entryList: {
      gap: spacing.sm,
    },
    entryCard: {},
    entryCardSurface: {
      padding: spacing.sm,
      backgroundColor: colors.surface ?? '#eef6f4',
    },
    entryTimeline: {
      paddingLeft: spacing.sm,
      borderLeftWidth: 2,
      borderLeftColor: colors.accent,
    },
    entryCompact: {
      paddingBottom: spacing.xs,
      borderBottomWidth: 1,
      borderBottomColor: colors.border ?? '#d7e0de',
    },
    entryCompactHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.xs,
      alignItems: 'flex-start',
    },
    entryCompactTitle: {
      fontFamily: template.theme.fonts.heading,
      fontSize: typography.baseSize,
      color: colors.text,
      flexShrink: 1,
    },
    entryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.sm,
      alignItems: 'flex-start',
    },
    entryHeading: {
      gap: spacing.xs,
      flexShrink: 1,
      flexGrow: 1,
      paddingRight: spacing.sm,
    },
    entryTitle: {
      fontFamily: template.theme.fonts.heading,
      fontSize: typography.headingSize ?? 11,
      color: colors.text,
    },
    entryOrganization: {
      fontSize: typography.baseSize,
      color: colors.accent,
    },
    entryMeta: {
      fontSize: typography.metaSize ?? 8,
      color: colors.muted,
      textAlign: 'right',
      flexShrink: 0,
      maxWidth: 116,
      marginLeft: spacing.xs,
    },
    entrySubtitle: {
      fontSize: typography.metaSize ?? 8,
      color: colors.muted,
      marginTop: 2,
    },
    bulletList: {
      marginTop: spacing.xs,
    },
    bulletRow: {
      flexDirection: 'row',
      gap: spacing.xs,
      paddingRight: spacing.xs,
    },
    bulletRowSpacing: {
      marginBottom: 3,
    },
    bullet: {
      color: colors.accent,
      width: 8,
    },
    tagRow: {
      marginTop: spacing.xs,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    tagChip: {
      fontSize: typography.metaSize ?? 8,
      color: colors.accent,
      backgroundColor: colors.surface ?? '#eef6f4',
      paddingHorizontal: spacing.xs,
      paddingVertical: 2,
    },
    inlineChipSpacing: {
      marginRight: spacing.xs,
      marginBottom: spacing.xs,
    },
    skillGroups: {
      marginTop: 0,
    },
    skillGroup: {
      padding: spacing.sm,
      backgroundColor: colors.surface ?? '#eef6f4',
    },
    groupSpacing: {
      marginBottom: spacing.xs,
    },
    skillGroupName: {
      fontFamily: template.theme.fonts.heading,
      fontSize: typography.metaSize ?? 8,
      textTransform: 'uppercase',
      color: colors.accent,
    },
    skillItem: {
      fontSize: typography.baseSize,
      lineHeight: typography.lineHeight,
      color: colors.text,
    },
    badgeWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    badgeChip: {
      fontSize: typography.metaSize ?? 8,
      color: colors.text,
      backgroundColor: colors.surface ?? '#eef6f4',
      paddingHorizontal: spacing.sm,
      paddingVertical: 3,
      marginBottom: spacing.xs,
    },
    compactList: {
      gap: spacing.xs,
    },
    languageList: {
      gap: spacing.xs,
    },
    languageRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.xs,
      alignItems: 'flex-start',
    },
    rowSpacing: {
      marginBottom: 4,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border ?? '#d7e0de',
      marginVertical: spacing.sm,
    },
  })
}
