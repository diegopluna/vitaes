import type { Section } from '@/providers/sections-provider'
import { useState } from 'react'

export const SectionTitle = ({ section }: { section: Section }) => {
  const [isEditing] = useState(false)

  if (!isEditing) {
    ;<h2 className="text-2xl font-semibold">{section.title}</h2>
  }
}
