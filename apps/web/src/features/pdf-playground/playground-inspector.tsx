import type { CompiledTemplateDocument } from './template-compiler/render-ir'
import type { ResolvedTemplateDocument } from './template-compiler/resolved-template-document'
import type { TemplateCompatibilityReport } from './template-compiler/validate-template-compatibility'
import type { TemplateBlock } from '@vitaes/backend/convex/shared/template'
import type { InspectorView } from './playground-state'
import {
  InspectorRegionSummary,
  InspectorTab,
  JsonPanel,
  Metric,
  SectionLabel,
} from './playground-primitives'
import { getBlockLabel } from './playground-state'

type PlaygroundInspectorProps = {
  compatibilityReport: TemplateCompatibilityReport
  compiledDocument: CompiledTemplateDocument | null
  inspectorView: InspectorView
  resolvedDocument: ResolvedTemplateDocument
  selectedDraftBlock: TemplateBlock | null
  supportedSectionKinds: string[]
  onInspectorViewChange: (view: InspectorView) => void
}

export function PlaygroundInspector({
  compatibilityReport,
  compiledDocument,
  inspectorView,
  resolvedDocument,
  selectedDraftBlock,
  supportedSectionKinds,
  onInspectorViewChange,
}: PlaygroundInspectorProps) {
  return (
    <section className="space-y-4">
      <SectionLabel
        title="Compiler Inspector"
        subtitle="Read the semantic and planned output from the current draft."
      />

      <div className="grid grid-cols-3 gap-2">
        <InspectorTab
          active={inspectorView === 'summary'}
          label="Summary"
          onClick={() => onInspectorViewChange('summary')}
        />
        <InspectorTab
          active={inspectorView === 'resolved'}
          label="Resolved"
          onClick={() => onInspectorViewChange('resolved')}
        />
        <InspectorTab
          active={inspectorView === 'compiled'}
          label="Compiled"
          onClick={() => onInspectorViewChange('compiled')}
        />
      </div>

      {inspectorView === 'summary' ? (
        <div className="space-y-4">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Metric
              label="Resolved Blocks"
              value={String(
                Object.values(resolvedDocument.regions).reduce(
                  (count, blocks) => count + blocks.length,
                  0,
                ),
              )}
            />
            <Metric
              label="Render Nodes"
              value={String(
                Object.values(compiledDocument?.regions ?? {}).reduce(
                  (count, nodes) => count + nodes.length,
                  0,
                ),
              )}
            />
            <Metric
              label="Template Coverage"
              value={String(supportedSectionKinds.length)}
            />
            <Metric
              label="Selected Block"
              value={
                selectedDraftBlock ? getBlockLabel(selectedDraftBlock) : 'None'
              }
            />
            <Metric
              label="Warnings"
              value={String(compatibilityReport.warnings.length)}
            />
            <Metric
              label="Errors"
              value={String(compatibilityReport.errors.length)}
            />
          </dl>

          <div className="rounded-[1.5rem] border border-white/8 bg-black/15 p-4">
            <p className="text-xs font-medium tracking-[0.2em] text-white/35 uppercase">
              Selected Draft Block
            </p>
            <pre className="mt-3 overflow-x-auto text-xs leading-6 text-white/75">
              {JSON.stringify(selectedDraftBlock, null, 2)}
            </pre>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InspectorRegionSummary
              regions={resolvedDocument.regions}
              title="Resolved Regions"
            />
            {compiledDocument ? (
              <InspectorRegionSummary
                regions={compiledDocument.regions}
                title="Compiled Regions"
              />
            ) : (
              <div className="rounded-[1.5rem] border border-red-400/20 bg-red-500/5 p-4">
                <p className="text-xs font-medium tracking-[0.2em] text-red-200/70 uppercase">
                  Compiled Regions
                </p>
                <p className="mt-3 text-sm leading-6 text-red-100/80">
                  Compilation is blocked because the current template and resume
                  pair has compatibility errors.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {inspectorView === 'resolved' ? (
        <JsonPanel data={resolvedDocument} title="Resolved Document" />
      ) : null}

      {inspectorView === 'compiled' ? (
        <JsonPanel
          data={
            compiledDocument ?? {
              blocked: true,
              errors: compatibilityReport.errors,
            }
          }
          title="Compiled Document"
        />
      ) : null}
    </section>
  )
}
