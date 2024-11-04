'use client'

import { Award } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResumeStore } from '@/providers/resume-store-provider'
import { AwardSheet } from './sheets/awards-sheet'

const awardKey = Symbol('award')

function getAwardData(award: Award): ItemData<Award> {
  return {
    [awardKey]: true,
    itemId: award.id,
  }
}

function isAwardData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Award> {
  return data[awardKey] === true
}

const AwardDragList = DragList<Award>

export const AwardsForm = () => {
  const { resume, setAwards } = useResumeStore((state) => state)

  const awards = resume.awards

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {awards.length === 0 && <p className="text-center">No awards added</p>}
      <AwardDragList
        items={awards}
        getItemData={getAwardData}
        isItemData={isAwardData}
        setItems={setAwards}
        itemType="award"
        onDelete={(id) => {
          setAwards(awards.filter((a) => a.id !== id))
        }}
        EditModal={AwardSheet}
      />
    </div>
  )
}
