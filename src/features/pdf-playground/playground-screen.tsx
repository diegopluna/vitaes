import { pdf } from '@react-pdf/renderer'
import {
  IconDownload,
  IconFlask,
  IconSparkles,
  IconSwitchHorizontal,
} from '@tabler/icons-react'
import { startTransition, useDeferredValue, useMemo, useState } from 'react'

import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import type { ResumeDocument } from '../../../convex/shared/resume'
import type { TemplateSectionBlock } from '../../../convex/shared/template'
import { PdfPreview } from './pdf-preview'
import { resumeFixtures, templateFixtures } from './sample-data'
import { PlaygroundPdfDocument } from './playground-pdf-document'

export function PlaygroundScreen() {
  const [selectedResumeId, setSelectedResumeId] = useState(resumeFixtures[0].id)
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    templateFixtures[0].id,
  )
  const [visibilityOverrides, setVisibilityOverrides] = useState<
    Record<string, boolean>
  >({})

  const selectedResumeFixture = useMemo(
    () =>
      resumeFixtures.find((fixture) => fixture.id === selectedResumeId) ??
      resumeFixtures[0],
    [selectedResumeId],
  )
  const selectedTemplateFixture = useMemo(
    () =>
      templateFixtures.find((fixture) => fixture.id === selectedTemplateId) ??
      templateFixtures[0],
    [selectedTemplateId],
  )

  const effectiveDocument = useMemo<ResumeDocument>(
    () => ({
      ...selectedResumeFixture.document,
      sections: selectedResumeFixture.document.sections.map((section) => ({
        ...section,
        visible: visibilityOverrides[section.id] ?? section.visible ?? true,
      })),
    }),
    [selectedResumeFixture, visibilityOverrides],
  )

  const deferredDocument = useDeferredValue(effectiveDocument)
  const deferredTemplate = useDeferredValue(selectedTemplateFixture.template)

  const visibleSectionCount = effectiveDocument.sections.filter(
    (section) => section.visible !== false,
  ).length
  const supportedSectionKinds = new Set(
    deferredTemplate.regions.main
      .concat(deferredTemplate.regions.sidebar ?? [])
      .filter(
        (block): block is TemplateSectionBlock => block.type === 'section',
      )
      .map((block) => block.section),
  )

  const handleVisibilityToggle = (sectionId: string, checked: boolean) => {
    startTransition(() => {
      setVisibilityOverrides((previous) => ({
        ...previous,
        [sectionId]: checked,
      }))
    })
  }

  const handleResumeChange = (value: string) => {
    startTransition(() => {
      setSelectedResumeId(value)
      setVisibilityOverrides({})
    })
  }

  const handleTemplateChange = (value: string) => {
    startTransition(() => {
      setSelectedTemplateId(value)
    })
  }

  const handleDownload = async () => {
    const blob = await pdf(
      <PlaygroundPdfDocument
        document={deferredDocument}
        template={deferredTemplate}
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
    <div className="flex min-h-svh w-full flex-col">
      <header className="flex h-16 items-center justify-between border-b border-white/10 px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(36,112,104,0.95),rgba(12,31,43,0.95))] text-white">
            <IconFlask className="size-4.5" />
          </div>
          <div>
            <p className="text-[11px] font-medium tracking-[0.28em] text-white/45 uppercase">
              Validation Route
            </p>
            <h1 className="font-heading text-xl font-semibold text-white">
              PDF Playground
            </h1>
          </div>
        </div>
        <Button onClick={handleDownload}>
          <IconDownload className="size-4" />
          Download Snapshot
        </Button>
      </header>

      <div className="grid flex-1 gap-6 bg-[radial-gradient(circle_at_top_left,rgba(29,111,103,0.18),transparent_28%),linear-gradient(180deg,#090c11_0%,#10161d_100%)] p-6 xl:grid-cols-[minmax(0,25rem)_minmax(0,1fr)]">
        <aside className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-white/80 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium tracking-[0.28em] text-white/45 uppercase">
                Working Set
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-white">
                Shared schema workbench
              </h2>
            </div>
            <IconSparkles className="mt-1 size-5 text-[#78d0c5]" />
          </div>

          <p className="mt-4 text-sm leading-6 text-white/65">
            Use the controls below to swap fixtures, toggle sections, and see
            how the current template DSL behaves before wiring any editor state.
          </p>

          <Separator className="my-6 bg-white/10" />

          <div className="space-y-4">
            <ControlField
              label="Resume Fixture"
              description={selectedResumeFixture.description}
            >
              <select
                className="h-10 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
                value={selectedResumeId}
                onChange={(event) => handleResumeChange(event.target.value)}
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
                onChange={(event) => handleTemplateChange(event.target.value)}
              >
                {templateFixtures.map((fixture) => (
                  <option key={fixture.id} value={fixture.id}>
                    {fixture.label}
                  </option>
                ))}
              </select>
            </ControlField>
          </div>

          <Separator className="my-6 bg-white/10" />

          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Metric
              label="Template"
              value={selectedTemplateFixture.template.name}
            />
            <Metric
              label="Page Size"
              value={selectedTemplateFixture.template.page.size}
            />
            <Metric
              label="Sections"
              value={String(effectiveDocument.sections.length)}
            />
            <Metric label="Visible" value={String(visibleSectionCount)} />
          </dl>

          <Separator className="my-6 bg-white/10" />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <IconSwitchHorizontal className="size-4 text-[#78d0c5]" />
              <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
                Section Visibility
              </p>
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
                      handleVisibilityToggle(section.id, event.target.checked)
                    }
                  />
                </label>
              ))}
            </div>
          </div>

          <Separator className="my-6 bg-white/10" />

          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
                Template Coverage
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {Array.from(supportedSectionKinds).map((kind) => (
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
                <li>Footer blocks and compact layouts remain readable.</li>
                <li>
                  Dense fixtures expose pagination and spacing regressions.
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <PdfPreview document={deferredDocument} template={deferredTemplate} />
        </section>
      </div>
    </div>
  )
}

function ControlField({
  label,
  description,
  children,
}: {
  label: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
        {label}
      </p>
      <p className="mt-2 text-sm text-white/60">{description}</p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/15 p-4">
      <dt className="text-[11px] font-medium tracking-[0.22em] text-white/40 uppercase">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-medium text-white">{value}</dd>
    </div>
  )
}
