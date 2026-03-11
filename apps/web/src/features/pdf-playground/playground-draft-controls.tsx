import type {
  ResumeTemplateDefinition,
  TemplateBlock,
} from '@vitaes/backend/convex/shared/template'
import type { RegionKey, SelectedBlockLocation } from './playground-state'
import {
  ALIGN_OPTIONS,
  DENSITY_OPTIONS,
  PAGE_SIZE_OPTIONS,
  REGION_KEYS,
  TEXT_STYLE_OPTIONS,
  getBlockLabel,
  getBlockMeta,
  getRegionBlocks,
  getVariantOptions,
  hasVariant,
  setBlockVariant,
} from './playground-state'
import {
  ControlField,
  InlineField,
  Metric,
  MiniButton,
  SectionLabel,
} from './playground-primitives'

type PlaygroundDraftControlsProps = {
  draftTemplate: ResumeTemplateDefinition
  selectedBlockLocation: SelectedBlockLocation | null
  visibleSectionCount: number
  onSelectBlock: (location: SelectedBlockLocation) => void
  onMoveRegionBlock: (
    region: RegionKey,
    index: number,
    direction: 'up' | 'down',
  ) => void
  onUpdateDraftTemplate: (
    updater: (template: ResumeTemplateDefinition) => ResumeTemplateDefinition,
  ) => void
  onUpdateRegionBlock: (
    region: RegionKey,
    index: number,
    updater: (block: TemplateBlock) => TemplateBlock,
  ) => void
}

export function PlaygroundDraftControls({
  draftTemplate,
  selectedBlockLocation,
  visibleSectionCount,
  onMoveRegionBlock,
  onSelectBlock,
  onUpdateDraftTemplate,
  onUpdateRegionBlock,
}: PlaygroundDraftControlsProps) {
  return (
    <section className="space-y-4">
      <SectionLabel
        title="Draft Controls"
        subtitle="Change page/theme tokens and edit top-level template blocks."
      />

      <dl className="grid grid-cols-2 gap-4 text-sm">
        <Metric label="Template" value={draftTemplate.name} />
        <Metric label="Page Size" value={draftTemplate.page.size} />
        <Metric
          label="Blocks"
          value={String(
            REGION_KEYS.reduce(
              (count, region) =>
                count + getRegionBlocks(draftTemplate, region).length,
              0,
            ),
          )}
        />
        <Metric label="Visible" value={String(visibleSectionCount)} />
      </dl>

      <div className="grid gap-4 md:grid-cols-2">
        <ControlField
          label="Page Size"
          description="Switch the export target page preset."
        >
          <select
            className="h-10 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
            value={draftTemplate.page.size}
            onChange={(event) =>
              onUpdateDraftTemplate((current) => ({
                ...current,
                page: {
                  ...current.page,
                  size: event.target
                    .value as (typeof PAGE_SIZE_OPTIONS)[number],
                },
              }))
            }
          >
            {PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </ControlField>

        <ControlField
          label="Density"
          description="Keep track of the density token even before it drives more layout behavior."
        >
          <select
            className="h-10 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
            value={draftTemplate.theme.density}
            onChange={(event) =>
              onUpdateDraftTemplate((current) => ({
                ...current,
                theme: {
                  ...current.theme,
                  density: event.target
                    .value as (typeof DENSITY_OPTIONS)[number],
                },
              }))
            }
          >
            {DENSITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </ControlField>

        <ControlField
          label="Accent"
          description="Primary accent token used by headings, highlights, and timeline treatments."
        >
          <input
            className="h-10 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
            value={draftTemplate.theme.colors.accent}
            onChange={(event) =>
              onUpdateDraftTemplate((current) => ({
                ...current,
                theme: {
                  ...current.theme,
                  colors: {
                    ...current.theme.colors,
                    accent: event.target.value,
                  },
                },
              }))
            }
          />
        </ControlField>

        <ControlField
          label="Base Size"
          description="Body type scale used for most paragraph content."
        >
          <input
            type="number"
            step="0.1"
            className="h-10 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
            value={draftTemplate.theme.typography.baseSize}
            onChange={(event) => {
              const value = event.target.valueAsNumber
              if (Number.isNaN(value)) {
                return
              }

              onUpdateDraftTemplate((current) => ({
                ...current,
                theme: {
                  ...current.theme,
                  typography: {
                    ...current.theme.typography,
                    baseSize: value,
                  },
                },
              }))
            }}
          />
        </ControlField>
      </div>

      {draftTemplate.page.columns ? (
        <div className="grid gap-4 md:grid-cols-3">
          <ControlField label="Left Column" description="Sidebar weight.">
            <input
              type="number"
              step="0.1"
              className="h-10 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
              value={draftTemplate.page.columns.left}
              onChange={(event) => {
                const value = event.target.valueAsNumber
                if (Number.isNaN(value)) {
                  return
                }

                onUpdateDraftTemplate((current) => ({
                  ...current,
                  page: {
                    ...current.page,
                    columns: current.page.columns
                      ? { ...current.page.columns, left: value }
                      : current.page.columns,
                  },
                }))
              }}
            />
          </ControlField>

          <ControlField label="Right Column" description="Main column weight.">
            <input
              type="number"
              step="0.1"
              className="h-10 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
              value={draftTemplate.page.columns.right}
              onChange={(event) => {
                const value = event.target.valueAsNumber
                if (Number.isNaN(value)) {
                  return
                }

                onUpdateDraftTemplate((current) => ({
                  ...current,
                  page: {
                    ...current.page,
                    columns: current.page.columns
                      ? { ...current.page.columns, right: value }
                      : current.page.columns,
                  },
                }))
              }}
            />
          </ControlField>

          <ControlField
            label="Column Gap"
            description="Space between sidebar and main."
          >
            <input
              type="number"
              step="0.1"
              className="h-10 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
              value={draftTemplate.page.columns.gap}
              onChange={(event) => {
                const value = event.target.valueAsNumber
                if (Number.isNaN(value)) {
                  return
                }

                onUpdateDraftTemplate((current) => ({
                  ...current,
                  page: {
                    ...current.page,
                    columns: current.page.columns
                      ? { ...current.page.columns, gap: value }
                      : current.page.columns,
                  },
                }))
              }}
            />
          </ControlField>
        </div>
      ) : null}

      <div className="space-y-4">
        {REGION_KEYS.map((region) => (
          <RegionBlockEditor
            key={region}
            draftTemplate={draftTemplate}
            region={region}
            selectedBlockLocation={selectedBlockLocation}
            onMoveRegionBlock={onMoveRegionBlock}
            onSelectBlock={onSelectBlock}
            onUpdateRegionBlock={onUpdateRegionBlock}
          />
        ))}
      </div>
    </section>
  )
}

function RegionBlockEditor({
  draftTemplate,
  region,
  selectedBlockLocation,
  onMoveRegionBlock,
  onSelectBlock,
  onUpdateRegionBlock,
}: {
  draftTemplate: ResumeTemplateDefinition
  region: RegionKey
  selectedBlockLocation: SelectedBlockLocation | null
  onMoveRegionBlock: (
    region: RegionKey,
    index: number,
    direction: 'up' | 'down',
  ) => void
  onSelectBlock: (location: SelectedBlockLocation) => void
  onUpdateRegionBlock: (
    region: RegionKey,
    index: number,
    updater: (block: TemplateBlock) => TemplateBlock,
  ) => void
}) {
  const blocks = getRegionBlocks(draftTemplate, region)

  return (
    <div className="rounded-[1.5rem] border border-white/8 bg-black/15 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-white/35 uppercase">
            {region}
          </p>
          <p className="mt-1 text-sm text-white/60">
            {blocks.length > 0
              ? `${blocks.length} top-level blocks`
              : 'No blocks in this region'}
          </p>
        </div>
      </div>

      {blocks.length > 0 ? (
        <div className="mt-4 space-y-3">
          {blocks.map((block, index) => {
            const isSelected =
              selectedBlockLocation?.region === region &&
              selectedBlockLocation.index === index

            return (
              <div
                key={`${region}-${index}`}
                className={`rounded-2xl border px-4 py-3 ${
                  isSelected
                    ? 'border-[#78d0c5]/60 bg-[#78d0c5]/10'
                    : 'border-white/8 bg-black/25'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <button
                      className="text-left"
                      onClick={() => onSelectBlock({ region, index })}
                      type="button"
                    >
                      <p className="text-sm font-medium text-white">
                        {getBlockLabel(block)}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/35">
                        {getBlockMeta(block)}
                      </p>
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <MiniButton
                      disabled={index === 0}
                      label="Up"
                      onClick={() => onMoveRegionBlock(region, index, 'up')}
                    />
                    <MiniButton
                      disabled={index === blocks.length - 1}
                      label="Down"
                      onClick={() => onMoveRegionBlock(region, index, 'down')}
                    />
                  </div>
                </div>

                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {hasVariant(block) ? (
                    <InlineField label="Variant">
                      <select
                        className="h-9 w-full rounded-xl border border-white/10 bg-black/25 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
                        value={block.variant}
                        onChange={(event) =>
                          onUpdateRegionBlock(region, index, (current) =>
                            setBlockVariant(current, event.target.value),
                          )
                        }
                      >
                        {getVariantOptions(block).map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </InlineField>
                  ) : null}

                  {block.type === 'section' || block.type === 'summary' ? (
                    <InlineField label="Title Override">
                      <input
                        className="h-9 w-full rounded-xl border border-white/10 bg-black/25 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
                        value={block.title ?? ''}
                        onChange={(event) =>
                          onUpdateRegionBlock(region, index, (current) =>
                            current.type === 'section' ||
                            current.type === 'summary'
                              ? {
                                  ...current,
                                  title: event.target.value || undefined,
                                }
                              : current,
                          )
                        }
                      />
                    </InlineField>
                  ) : null}

                  {block.type === 'basics' || block.type === 'text' ? (
                    <InlineField label="Alignment">
                      <select
                        className="h-9 w-full rounded-xl border border-white/10 bg-black/25 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
                        value={block.align ?? 'left'}
                        onChange={(event) =>
                          onUpdateRegionBlock(region, index, (current) =>
                            current.type === 'basics' || current.type === 'text'
                              ? {
                                  ...current,
                                  align: event.target
                                    .value as (typeof ALIGN_OPTIONS)[number],
                                }
                              : current,
                          )
                        }
                      >
                        {ALIGN_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </InlineField>
                  ) : null}

                  {block.type === 'text' ? (
                    <InlineField label="Text Style">
                      <select
                        className="h-9 w-full rounded-xl border border-white/10 bg-black/25 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
                        value={block.style ?? 'body'}
                        onChange={(event) =>
                          onUpdateRegionBlock(region, index, (current) =>
                            current.type === 'text'
                              ? {
                                  ...current,
                                  style: event.target
                                    .value as (typeof TEXT_STYLE_OPTIONS)[number],
                                }
                              : current,
                          )
                        }
                      >
                        {TEXT_STYLE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </InlineField>
                  ) : null}

                  {block.type === 'spacer' ? (
                    <InlineField label="Spacer Size">
                      <input
                        type="number"
                        step="0.1"
                        className="h-9 w-full rounded-xl border border-white/10 bg-black/25 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
                        value={block.size}
                        onChange={(event) => {
                          const value = event.target.valueAsNumber
                          if (Number.isNaN(value)) {
                            return
                          }

                          onUpdateRegionBlock(region, index, (current) =>
                            current.type === 'spacer'
                              ? { ...current, size: value }
                              : current,
                          )
                        }}
                      />
                    </InlineField>
                  ) : null}

                  {block.type === 'group' ? (
                    <>
                      <InlineField label="Group Layout">
                        <select
                          className="h-9 w-full rounded-xl border border-white/10 bg-black/25 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
                          value={block.layout}
                          onChange={(event) =>
                            onUpdateRegionBlock(region, index, (current) =>
                              current.type === 'group'
                                ? {
                                    ...current,
                                    layout: event.target
                                      .value as typeof current.layout,
                                  }
                                : current,
                            )
                          }
                        >
                          <option value="stack">stack</option>
                          <option value="row">row</option>
                        </select>
                      </InlineField>
                      <InlineField label="Group Gap">
                        <input
                          type="number"
                          step="0.1"
                          className="h-9 w-full rounded-xl border border-white/10 bg-black/25 px-3 text-sm text-white outline-none transition focus:border-[#78d0c5]"
                          value={block.gap ?? ''}
                          onChange={(event) => {
                            const value = event.target.valueAsNumber
                            onUpdateRegionBlock(region, index, (current) =>
                              current.type === 'group'
                                ? {
                                    ...current,
                                    gap: Number.isNaN(value)
                                      ? undefined
                                      : value,
                                  }
                                : current,
                            )
                          }}
                        />
                      </InlineField>
                    </>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
