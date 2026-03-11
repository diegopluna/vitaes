import { pdf } from '@react-pdf/renderer'
import {
  IconDownload,
  IconSparkles,
  IconSwitchHorizontal,
} from '@tabler/icons-react'
import { startTransition, useState } from 'react'

import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import type { ResumeDocument } from '../../../convex/shared/resume'
import type {
  ResumeTemplateDefinition,
  TemplateBlock,
} from '../../../convex/shared/template'
import { PdfPreview } from './pdf-preview'
import { PlaygroundPdfDocument } from './playground-pdf-document'
import type { ResumeFixture, TemplateFixture } from './sample-data'
import { resumeFixtures, templateFixtures } from './sample-data'
import { compileTemplateDocument } from './template-compiler/compile-template-document'
import { resolveTemplateDocument } from './template-compiler/resolve-template-document'
import { PlaygroundDraftControls } from './playground-draft-controls'
import { PlaygroundInspector } from './playground-inspector'
import type {
  InspectorView,
  RegionKey,
  SelectedBlockLocation,
} from './playground-state'
import {
  createTemplateDraft,
  getSelectedDraftBlock,
  getSupportedSectionKinds,
  getVisibleSectionCount,
  moveRegionBlock,
  resetTemplateDraft,
  updateRegionBlock,
} from './playground-state'
import { ControlField, SectionLabel } from './playground-primitives'

type PlaygroundWorkbenchProps = {
  effectiveDocument: ResumeDocument
  selectedResumeFixture: ResumeFixture
  selectedResumeId: string
  selectedTemplateFixture: TemplateFixture
  selectedTemplateId: string
  onResumeChange: (value: string) => void
  onTemplateChange: (value: string) => void
  onVisibilityToggle: (sectionId: string, checked: boolean) => void
}

export function PlaygroundWorkbench({
  effectiveDocument,
  onResumeChange,
  onTemplateChange,
  onVisibilityToggle,
  selectedResumeFixture,
  selectedResumeId,
  selectedTemplateFixture,
  selectedTemplateId,
}: PlaygroundWorkbenchProps) {
  const [draftTemplate, setDraftTemplate] = useState<ResumeTemplateDefinition>(
    () => createTemplateDraft(selectedTemplateFixture.template),
  )
  const [selectedBlockLocation, setSelectedBlockLocation] =
    useState<SelectedBlockLocation | null>(null)
  const [inspectorView, setInspectorView] = useState<InspectorView>('summary')

  const resolvedDocument = resolveTemplateDocument({
    document: effectiveDocument,
    template: draftTemplate,
  })
  const compiledDocument = compileTemplateDocument({
    document: effectiveDocument,
    template: draftTemplate,
  })
  const selectedDraftBlock = getSelectedDraftBlock(
    draftTemplate,
    selectedBlockLocation,
  )
  const supportedSectionKinds = getSupportedSectionKinds(draftTemplate)
  const visibleSectionCount = getVisibleSectionCount(effectiveDocument)

  const updateDraftTemplate = (
    updater: (template: ResumeTemplateDefinition) => ResumeTemplateDefinition,
  ) => {
    startTransition(() => {
      setDraftTemplate((current) => updater(current))
    })
  }

  const handleUpdateRegionBlock = (
    region: RegionKey,
    index: number,
    updater: (block: TemplateBlock) => TemplateBlock,
  ) => {
    updateDraftTemplate((current) =>
      updateRegionBlock(current, region, index, updater),
    )
  }

  const handleMoveRegionBlock = (
    region: RegionKey,
    index: number,
    direction: 'up' | 'down',
  ) => {
    startTransition(() => {
      let nextLocation: SelectedBlockLocation | null = null

      setDraftTemplate((current) => {
        const result = moveRegionBlock(current, region, index, direction)
        nextLocation = result.nextLocation
        return result.template
      })

      if (nextLocation) {
        setSelectedBlockLocation(nextLocation)
      }
    })
  }

  const handleResetTemplate = () => {
    startTransition(() => {
      setDraftTemplate(resetTemplateDraft(selectedTemplateFixture.template))
      setSelectedBlockLocation(null)
      setInspectorView('summary')
    })
  }

  const handleDownload = async () => {
    const blob = await pdf(
      <PlaygroundPdfDocument
        document={effectiveDocument}
        template={draftTemplate}
      />,
    ).toBlob()

    const url = URL.createObjectURL(blob)
    const link = window.document.createElement('a')
    link.href = url
    link.download = `vitaes-${selectedResumeFixture.id}-${selectedTemplateFixture.id}.pdf`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <aside className="min-h-0 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-white/80 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium tracking-[0.28em] text-white/45 uppercase">
              Workbench
            </p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-white">
              Template draft + compiler inspector
            </h2>
          </div>
          <IconSparkles className="mt-1 size-5 text-[#78d0c5]" />
        </div>

        <p className="mt-4 text-sm leading-6 text-white/65">
          This playground now edits a draft template, compiles it through the
          real pipeline, and lets you inspect the resolved and planned output
          while the PDF preview updates beside it.
        </p>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={handleResetTemplate}>
            Reset Draft
          </Button>
          <Button onClick={handleDownload}>
            <IconDownload className="size-4" />
            Download Snapshot
          </Button>
        </div>

        <div className="mt-6 max-h-[calc(100vh-12.5rem)] space-y-6 overflow-y-auto pr-1">
          <section className="space-y-4">
            <SectionLabel
              title="Fixture Set"
              subtitle="Choose the resume and template baseline for the current draft."
            />

            <div className="space-y-4">
              <ControlField
                label="Resume Fixture"
                description={selectedResumeFixture.description}
              >
                <select
                  className="h-10 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
                  value={selectedResumeId}
                  onChange={(event) => onResumeChange(event.target.value)}
                >
                  {resumeFixtures.map((fixture) => (
                    <option key={fixture.id} value={fixture.id}>
                      {fixture.label}
                    </option>
                  ))}
                </select>
              </ControlField>

              <ControlField
                label="Template Fixture"
                description={selectedTemplateFixture.description}
              >
                <select
                  className="h-10 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
                  value={selectedTemplateId}
                  onChange={(event) => onTemplateChange(event.target.value)}
                >
                  {templateFixtures.map((fixture) => (
                    <option key={fixture.id} value={fixture.id}>
                      {fixture.label}
                    </option>
                  ))}
                </select>
              </ControlField>
            </div>
          </section>

          <Separator className="bg-white/10" />

          <PlaygroundDraftControls
            draftTemplate={draftTemplate}
            selectedBlockLocation={selectedBlockLocation}
            visibleSectionCount={visibleSectionCount}
            onMoveRegionBlock={handleMoveRegionBlock}
            onSelectBlock={(location) => {
              setSelectedBlockLocation(location)
              setInspectorView('summary')
            }}
            onUpdateDraftTemplate={updateDraftTemplate}
            onUpdateRegionBlock={handleUpdateRegionBlock}
          />

          <Separator className="bg-white/10" />

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <IconSwitchHorizontal className="size-4 text-[#78d0c5]" />
              <div>
                <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
                  Resume Visibility
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Toggle resume sections to validate visibility rules and empty
                  region behavior.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {effectiveDocument.sections.map((section) => (
                <label
                  key={section.id}
                  className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/15 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {section.title ?? section.kind}
                    </p>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                      {section.kind}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="size-4 accent-[#78d0c5]"
                    checked={section.visible !== false}
                    onChange={(event) =>
                      onVisibilityToggle(section.id, event.target.checked)
                    }
                  />
                </label>
              ))}
            </div>
          </section>

          <Separator className="bg-white/10" />

          <PlaygroundInspector
            compiledDocument={compiledDocument}
            inspectorView={inspectorView}
            resolvedDocument={resolvedDocument}
            selectedDraftBlock={selectedDraftBlock}
            supportedSectionKinds={supportedSectionKinds}
            onInspectorViewChange={setInspectorView}
          />

          <Separator className="bg-white/10" />

          <section className="space-y-4">
            <SectionLabel
              title="Coverage Notes"
              subtitle="Keep the old validation prompts visible while the editor surface grows."
            />

            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
                Template Coverage
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {supportedSectionKinds.map((kind) => (
                  <li key={kind}>{kind}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
                What to validate
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>Variant differences are visible, not just schema-valid.</li>
                <li>Visibility rules hide empty or toggled-off regions.</li>
                <li>Theme token changes surface immediately in the preview.</li>
                <li>Compiler output stays legible as template blocks move.</li>
              </ul>
            </div>
          </section>
        </div>
      </aside>

      <section className="min-w-0">
        <PdfPreview document={effectiveDocument} template={draftTemplate} />
      </section>
    </>
  )
}
