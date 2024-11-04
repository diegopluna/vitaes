'use client'

import { Interest } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResumeStore } from '@/providers/resume-store-provider'
import { InterestSheet } from './sheets/interest-sheet'

const interestKey = Symbol('interest')

function getInterestData(interest: Interest): ItemData<Interest> {
  return {
    [interestKey]: true,
    itemId: interest.id,
  }
}

function isInterestData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Interest> {
  return data[interestKey] === true
}

const InterestsDragList = DragList<Interest>

export const InterestsForm = () => {
  const { resume, setInterests } = useResumeStore((state) => state)

  const interests = resume.interests

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {interests.length === 0 && (
        <p className="text-center">No interests added</p>
      )}
      <InterestsDragList
        items={interests}
        getItemData={getInterestData}
        isItemData={isInterestData}
        setItems={setInterests}
        itemType="interest"
        onDelete={(id) => {
          setInterests(interests.filter((w) => w.id !== id))
        }}
        EditModal={InterestSheet}
      />
    </div>
  )
}
