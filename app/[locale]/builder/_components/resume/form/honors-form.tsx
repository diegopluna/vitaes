'use client'

import type { HonorsPerLabel } from '@/@types/resume'
import type { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResumeStore } from '@/providers/resume-store-provider'
import { HonorsSheet } from './sheets/honors-sheet'

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

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {honors.length === 0 && <p className="text-center">No honors added</p>}
      <HonorsPerLabelDragList
        items={honors}
        getItemData={getHonorsPerLabelData}
        isItemData={isHonorsPerLabelData}
        setItems={setResumeField.bind(null, 'honors')}
        EditSheet={HonorsSheet}
        itemType="Honors"
        onDelete={id => {
          setResumeField(
            'honors',
            honors.filter(h => h.id !== id),
          )
        }}
      />
    </div>
  )
}
