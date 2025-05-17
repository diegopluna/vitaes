'use client'

import type { HonorsPerLabel } from '@/@types/resume'
import type { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResumeStore } from '@/providers/resume-store-provider'
import { HonorsSheet } from './sheets/honors-sheet'
import { useTranslations } from 'next-intl'

const honorsPerLabelKey = Symbol('honorsPerLabel')

function getHonorsPerLabelData(
  honorsPerLabel: HonorsPerLabel,
): ItemData<HonorsPerLabel> {
  return {
    [honorsPerLabelKey]: true,
    itemId: honorsPerLabel.id,
  }
}

function isHonorsPerLabelData(
  data: Record<string | symbol, unknown>,
): data is ItemData<HonorsPerLabel> {
  return data[honorsPerLabelKey] === true
}

const HonorsPerLabelDragList = DragList<HonorsPerLabel>

export const HonorsForm = () => {
  const { resume, setResumeField } = useResumeStore(s => s)
  const honors = resume.honors
  const t = useTranslations('HonorsForm')

  function setHonors(honors: HonorsPerLabel[]) {
    setResumeField('honors', {
      ...resume.honors,
      content: honors,
    })
  }

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {honors.content.length === 0 && (
        <p className="text-center">{t('noneAdded', { label: honors.label })}</p>
      )}
      <HonorsPerLabelDragList
        items={honors.content}
        getItemData={getHonorsPerLabelData}
        isItemData={isHonorsPerLabelData}
        setItems={setHonors}
        EditSheet={HonorsSheet}
        itemType="Honors"
        onDelete={id => {
          setResumeField('honors', {
            ...resume.honors,
            content: resume.honors.content.filter(
              honorsPerLabel => honorsPerLabel.id !== id,
            ),
          })
        }}
      />
    </div>
  )
}
