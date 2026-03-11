import { StyleSheet } from '@react-pdf/renderer'
import type { Style } from '@react-pdf/types'

import type {
  ResumeTemplateDefinition,
  TemplateAlign,
  TemplateTextStyleRef,
} from '@vitaes/backend/convex/shared/template'

export type ReactPdfTemplateStyles = ReturnType<
  typeof createReactPdfTemplateStyles
>

export function styleList(...styles: Array<Style | false | null | undefined>) {
  return styles.filter(
    (style): style is Style => style != null && style !== false,
  )
}

export function resolveReactPdfTextStyle(
  styles: ReactPdfTemplateStyles,
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

export function getReactPdfSummaryContainerStyle(
  variant: 'paragraph' | 'compact' | 'highlight',
  styles: ReactPdfTemplateStyles,
) {
  if (variant === 'highlight') {
    return [styles.section, styles.highlightPanel]
  }

  return styles.section
}

export function getReactPdfSummaryTextStyle(
  variant: 'paragraph' | 'compact' | 'highlight',
  styles: ReactPdfTemplateStyles,
) {
  if (variant === 'compact') {
    return styles.compactText
  }

  return styles.bodyText
}

export function getReactPdfBasicsStyle(
  variant: 'hero' | 'compact' | 'split' | 'sidebar',
  align: 'left' | 'center' | 'right' | undefined,
  styles: ReactPdfTemplateStyles,
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

export function createReactPdfTemplateStyles(
  template: ResumeTemplateDefinition,
) {
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
