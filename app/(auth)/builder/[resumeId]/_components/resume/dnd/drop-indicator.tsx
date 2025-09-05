import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types'

// Indicator with left square pin head
export function DropIndicator({ edge }: { edge: Edge }) {
  const isTop = edge === 'top'

  // Adjust vertical position if needed, e.g., center the thinner line
  const verticalPosition = isTop
    ? 'top-0 -translate-y-1/2'
    : 'bottom-0 translate-y-1/2'

  return (
    <div
      className={`absolute left-0 right-0 h-2 ${verticalPosition} z-[200] pointer-events-none flex items-center`}
    >
      {/* Pin head */}
      <div className="absolute left-0 w-2 h-2 bg-primary" />
      {/* Line */}
      <div className="absolute left-2 right-0 h-0.5 bg-primary" />
    </div>
  )
}
