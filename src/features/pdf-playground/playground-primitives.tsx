import type { ReactNode } from 'react'

import type { RegionKey } from './playground-state'

export function ControlField({
  label,
  description,
  children,
}: {
  label: string
  description: string
  children: ReactNode
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

export function InlineField({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-medium tracking-[0.18em] text-white/35 uppercase">
        {label}
      </p>
      {children}
    </div>
  )
}

export function SectionLabel({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div>
      <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
        {title}
      </p>
      <p className="mt-2 text-sm text-white/60">{subtitle}</p>
    </div>
  )
}

export function MiniButton({
  disabled,
  label,
  onClick,
}: {
  disabled?: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      className="rounded-lg border border-white/10 bg-black/25 px-2.5 py-1 text-[11px] font-medium text-white/75 transition hover:border-[#78d0c5]/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}

export function InspectorTab({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      className={`rounded-xl border px-3 py-2 text-sm transition ${
        active
          ? 'border-[#78d0c5]/60 bg-[#78d0c5]/10 text-white'
          : 'border-white/10 bg-black/20 text-white/65 hover:border-white/20 hover:text-white'
      }`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}

export function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/15 p-4">
      <dt className="text-[11px] font-medium tracking-[0.22em] text-white/40 uppercase">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-medium text-white">{value}</dd>
    </div>
  )
}

export function JsonPanel({ data, title }: { data: unknown; title: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/8 bg-black/15 p-4">
      <p className="text-xs font-medium tracking-[0.2em] text-white/35 uppercase">
        {title}
      </p>
      <pre className="mt-3 max-h-[32rem] overflow-auto text-xs leading-6 text-white/75">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

export function InspectorRegionSummary({
  regions,
  title,
}: {
  regions: Record<RegionKey, unknown[]>
  title: string
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/8 bg-black/15 p-4">
      <p className="text-xs font-medium tracking-[0.2em] text-white/35 uppercase">
        {title}
      </p>
      <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
        {Object.entries(regions).map(([region, nodes]) => (
          <Metric key={region} label={region} value={String(nodes.length)} />
        ))}
      </dl>
    </div>
  )
}
