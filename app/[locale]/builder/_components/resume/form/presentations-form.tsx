'use client'

import type { Presentation } from '@/@types/resume'
import type { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResumeStore } from '@/providers/resume-store-provider'
import { PresentationSheet } from './sheets/presentation-sheet'

const presentationsKey = Symbol('presentation')

function getPresentationData(
  presentation: Presentation,
): ItemData<Presentation> {
  return {
    [presentationsKey]: true,
    itemId: presentation.id,
  }
}

function isPresentationData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Presentation> {
  return data[presentationsKey] === true
}

const PresentationDragList = DragList<Presentation>

export const PresentationsForm = () => {
  const { resume, setResumeField } = useResumeStore(s => s)

  const presentations = resume.presentations

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {presentations.length === 0 && (
        <p className="text-center">No presentations added</p>
      )}
      <PresentationDragList
        items={presentations}
        getItemData={getPresentationData}
        isItemData={isPresentationData}
        setItems={setResumeField.bind(null, 'presentations')}
        EditSheet={PresentationSheet}
        itemType="Presentations"
        onDelete={id => {
          setResumeField(
            'presentations',
            presentations.filter(p => p.id !== id),
          )
        }}
      />
    </div>
  )
}
