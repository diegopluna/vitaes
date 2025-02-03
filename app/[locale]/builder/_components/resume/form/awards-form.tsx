'use client'

import { Award } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResume } from '@/providers/resume-provider'
import { AwardsSheet } from './sheets/awards-sheet'

const awardsKey = Symbol('awards')

function getAwardsData(award: Award): ItemData<Award> {
  return {
    [awardsKey]: true,
    itemId: award.id,
  }
}

function isAwardsData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Award> {
  return data[awardsKey] === true
}

const AwardsDragList = DragList<Award>

export const AwardsForm = () => {
  const { resume, setAwards } = useResume()

  const awards = resume.awards

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {awards.length === 0 && <p className="text-center">No awards added</p>}
      <AwardsDragList
        items={awards}
        getItemData={getAwardsData}
        isItemData={isAwardsData}
        setItems={setAwards}
        EditSheet={AwardsSheet}
        itemType="Awards"
        onDelete={(id) => {
          setAwards(awards.filter((a) => a.id !== id))
        }}
      />
    </div>
  )
}
