import type {
  CompiledTemplateDocument,
  RenderNode,
} from '../template-compiler/render-ir'

export type RenderAdapterContext<TStyles> = {
  path: string
  styles: TStyles
}

export interface RenderAdapter<TOutput, TStyles> {
  renderDocument(
    document: CompiledTemplateDocument,
    context: RenderAdapterContext<TStyles>,
  ): TOutput
  renderNodes(
    nodes: RenderNode[],
    context: RenderAdapterContext<TStyles>,
  ): TOutput
}
