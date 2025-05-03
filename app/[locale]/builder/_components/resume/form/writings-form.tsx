'use client'

import { Writing } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { WritingSheet } from './sheets/writing-sheet'
import { useResumeStore } from '@/providers/resume-store-provider'

const writingKey = Symbol('writing')

function getWritingData(writing: Writing): ItemData<Writing> {
  return {
    [writingKey]: true,
    itemId: writing.id,
  }
}

function isWritingData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Writing> {
  return data[writingKey] === true
}

const WritingDragList = DragList<Writing>

export const WritingForm = () => {
  const { resume, setResumeField } = useResumeStore(s => s)

  const writings = resume.writings

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {writings.length === 0 && (
        <p className="text-center">No writings added</p>
      )}
      <WritingDragList
        items={writings}
        getItemData={getWritingData}
        isItemData={isWritingData}
        setItems={setResumeField.bind(null, 'writings')}
        EditSheet={WritingSheet}
        itemType="Writing Experience"
        onDelete={id => {
          setResumeField(
            'writings',
            writings.filter(w => w.id !== id),
          )
        }}
      />
    </div>
  )
}
