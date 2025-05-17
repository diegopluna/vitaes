'use client'

import { Work } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { WorkSheet } from './sheets/work-sheet'
import { useResumeStore } from '@/providers/resume-store-provider'
import { useTranslations } from 'next-intl'

const workKey = Symbol('work')

function getWorkData(work: Work): ItemData<Work> {
  return {
    [workKey]: true,
    itemId: work.id,
  }
}

function isWorkData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Work> {
  return data[workKey] === true
}

const WorkDragList = DragList<Work>

export const WorkForm = () => {
  const { resume, setResumeField } = useResumeStore(s => s)
  const t = useTranslations('WorkForm')

  const works = resume.work

  const setWorks = (works: Work[]) => {
    setResumeField('work', {
      ...resume.work,
      content: works,
    })
  }

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {works.content.length === 0 && (
        <p className="text-center">{t('noneAdded', { label: works.label })}</p>
      )}
      <WorkDragList
        items={works.content}
        getItemData={getWorkData}
        isItemData={isWorkData}
        setItems={setWorks}
        EditSheet={WorkSheet}
        itemType="Work Experience"
        onDelete={id => {
          setResumeField('work', {
            ...resume.work,
            content: works.content.filter(work => work.id !== id),
          })
        }}
      />
    </div>
  )
}
