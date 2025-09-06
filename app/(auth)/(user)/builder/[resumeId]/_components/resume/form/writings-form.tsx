'use client'

import { useTranslations } from 'next-intl'
import type { Writing } from '@/convex/resume/type'
import { useResumeStore } from '@/providers/resume-store-provider'
import type { ItemData } from '../dnd/drag'
import { DragList } from '../dnd/list'
import { WritingSheet } from '../sheet/writing-sheet'

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

export function WritingsForm() {
  const t = useTranslations('writings-form')
  const { resume, setResumeField } = useResumeStore((s) => s)
  const writings = resume.writings

  const setWritings = (writings: Writing[]) => {
    setResumeField('writings', {
      ...resume.writings,
      content: writings,
    })
  }

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {writings.content.length === 0 && (
        <p className="text-center">
          {t('no-writings-added', { label: writings.label })}
        </p>
      )}
      <WritingDragList
        items={writings.content}
        getItemData={getWritingData}
        isItemData={isWritingData}
        setItems={setWritings}
        EditSheet={WritingSheet}
        itemType={writings.label}
        onDelete={(id) => {
          setResumeField('writings', {
            ...resume.writings,
            content: writings.content.filter((writing) => writing.id !== id),
          })
        }}
      />
    </div>
  )
}
