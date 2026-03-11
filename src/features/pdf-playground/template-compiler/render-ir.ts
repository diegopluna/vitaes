import type { Style } from '@react-pdf/types'

import type { ResumeTemplateDefinition } from '../../../../convex/shared/template'

export type RenderStyleValue = string | Style

export type RenderTextSegment = {
  text: string
  style?: RenderStyleValue[]
}

export type RenderNode =
  | {
      type: 'view'
      style?: RenderStyleValue[]
      children: RenderNode[]
      wrap?: boolean
      minPresenceAhead?: number
    }
  | {
      type: 'text'
      style?: RenderStyleValue[]
      text?: string
      segments?: RenderTextSegment[]
      minPresenceAhead?: number
    }
  | {
      type: 'link'
      style?: RenderStyleValue[]
      text: string
      href: string
    }
  | {
      type: 'divider'
      style?: RenderStyleValue[]
    }
  | {
      type: 'spacer'
      size: number
    }

export type PlannedRenderDocument = {
  title: string
  template: ResumeTemplateDefinition
  regions: {
    header: RenderNode[]
    sidebar: RenderNode[]
    main: RenderNode[]
    footer: RenderNode[]
  }
}
