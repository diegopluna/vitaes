import type { ReactNode } from 'react'
import { Link, Text, View } from '@react-pdf/renderer'
import type { Style } from '@react-pdf/types'

import type {
  CompiledTemplateDocument,
  RenderNode,
  RenderStyleValue,
  RenderTextSegment,
} from '../../template-compiler/render-ir'
import type { RenderAdapter, RenderAdapterContext } from '../render-adapter'
import { styleList } from './react-pdf-styles'
import type { ReactPdfTemplateStyles } from './react-pdf-styles'

type ReactPdfRenderNodeTreeProps = {
  nodes: RenderNode[]
  styles: ReactPdfTemplateStyles
  path: string
}

export function ReactPdfRenderNodeTree({
  nodes,
  styles,
  path,
}: ReactPdfRenderNodeTreeProps) {
  return reactPdfRenderAdapter.renderNodes(nodes, { path, styles })
}

function renderNode(
  node: RenderNode,
  styles: ReactPdfTemplateStyles,
  path: string,
): ReactNode {
  switch (node.type) {
    case 'view':
      return (
        <View
          key={path}
          minPresenceAhead={node.minPresenceAhead}
          style={resolveNodeStyles(styles, node.style)}
          wrap={node.wrap}
        >
          <ReactPdfRenderNodeTree
            nodes={node.children}
            path={path}
            styles={styles}
          />
        </View>
      )
    case 'text':
      return (
        <Text
          key={path}
          minPresenceAhead={node.minPresenceAhead}
          style={resolveNodeStyles(styles, node.style)}
        >
          {node.segments
            ? renderTextSegments(node.segments, styles, path)
            : (node.text ?? '')}
        </Text>
      )
    case 'link':
      return (
        <Link
          key={path}
          src={node.href}
          style={resolveNodeStyles(styles, node.style)}
        >
          {node.text}
        </Link>
      )
    case 'divider':
      return <View key={path} style={resolveNodeStyles(styles, node.style)} />
    case 'spacer':
      return <View key={path} style={{ height: node.size }} />
    default:
      return assertNever(node)
  }
}

function renderTextSegments(
  segments: RenderTextSegment[],
  styles: ReactPdfTemplateStyles,
  path: string,
) {
  return segments.map((segment, index) =>
    segment.style && segment.style.length > 0 ? (
      <Text
        key={`${path}-segment-${index}`}
        style={resolveNodeStyles(styles, segment.style)}
      >
        {segment.text}
      </Text>
    ) : (
      segment.text
    ),
  )
}

function resolveNodeStyles(
  styles: ReactPdfTemplateStyles,
  values?: RenderStyleValue[],
) {
  return styleList(
    ...(values ?? []).map((value) =>
      typeof value === 'string'
        ? styles[value as keyof ReactPdfTemplateStyles]
        : (value as Style),
    ),
  )
}

function assertNever(value: never): never {
  throw new Error(`Unexpected React PDF node: ${JSON.stringify(value)}`)
}

export const reactPdfRenderAdapter: RenderAdapter<
  ReactNode[],
  ReactPdfTemplateStyles
> = {
  renderDocument(
    document: CompiledTemplateDocument,
    context: RenderAdapterContext<ReactPdfTemplateStyles>,
  ) {
    return this.renderNodes(document.regions.main, context)
  },
  renderNodes(
    nodes: RenderNode[],
    context: RenderAdapterContext<ReactPdfTemplateStyles>,
  ) {
    return nodes.map((node, index) =>
      renderNode(node, context.styles, `${context.path}-${index}`),
    )
  },
}
