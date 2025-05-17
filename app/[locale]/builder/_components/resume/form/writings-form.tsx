'use client'

import { Writing } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { WritingSheet } from './sheets/writing-sheet'
import { useResumeStore } from '@/providers/resume-store-provider'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('WritingsForm')

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
          {t('noneAdded', { label: writings.label })}
        </p>
      )}
      <WritingDragList
        items={writings.content}
        getItemData={getWritingData}
        isItemData={isWritingData}
        setItems={setWritings}
        EditSheet={WritingSheet}
        itemType="Writing Experience"
        onDelete={id => {
          setResumeField('writings', {
            ...resume.writings,
            content: writings.content.filter(writing => writing.id !== id),
          })
        }}
      />
    </div>
  )
}
