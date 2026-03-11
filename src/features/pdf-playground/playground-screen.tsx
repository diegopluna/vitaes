import { IconFlask } from '@tabler/icons-react'
import { startTransition, useState } from 'react'

import { buildEffectiveDocument } from './playground-state'
import { PlaygroundWorkbench } from './playground-workbench'
import { resumeFixtures, templateFixtures } from './sample-data'

export function PlaygroundScreen() {
  const [selectedResumeId, setSelectedResumeId] = useState(resumeFixtures[0].id)
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    templateFixtures[0].id,
  )
  const [visibilityOverrides, setVisibilityOverrides] = useState<
    Record<string, boolean>
  >({})

  const selectedResumeFixture =
    resumeFixtures.find((fixture) => fixture.id === selectedResumeId) ??
    resumeFixtures[0]
  const selectedTemplateFixture =
    templateFixtures.find((fixture) => fixture.id === selectedTemplateId) ??
    templateFixtures[0]

  const effectiveDocument = buildEffectiveDocument(
    selectedResumeFixture.document,
    visibilityOverrides,
  )

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

  const handleVisibilityToggle = (sectionId: string, checked: boolean) => {
    startTransition(() => {
      setVisibilityOverrides((previous) => ({
        ...previous,
        [sectionId]: checked,
      }))
    })
  }

  return (
    <div className="flex min-h-svh w-full flex-col">
      <header className="flex h-16 items-center gap-3 border-b border-white/10 px-8">
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
      </header>

      <div className="grid flex-1 gap-6 bg-[radial-gradient(circle_at_top_left,rgba(29,111,103,0.18),transparent_28%),linear-gradient(180deg,#090c11_0%,#10161d_100%)] p-6 xl:grid-cols-[minmax(0,34rem)_minmax(0,1fr)]">
        <PlaygroundWorkbench
          key={selectedTemplateFixture.id}
          effectiveDocument={effectiveDocument}
          selectedResumeFixture={selectedResumeFixture}
          selectedResumeId={selectedResumeId}
          selectedTemplateFixture={selectedTemplateFixture}
          selectedTemplateId={selectedTemplateId}
          onResumeChange={handleResumeChange}
          onTemplateChange={handleTemplateChange}
          onVisibilityToggle={handleVisibilityToggle}
        />
      </div>
    </div>
  )
}
