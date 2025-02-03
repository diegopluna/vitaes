'use client'

import { Work } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResume } from '@/providers/resume-provider'
import { WorkSheet } from './sheets/work-sheet'

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
  const { resume, setWork } = useResume()

  const works = resume.work

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {works.length === 0 && (
        <p className="text-center">No work experience added</p>
      )}
      <WorkDragList
        items={works}
        getItemData={getWorkData}
        isItemData={isWorkData}
        setItems={setWork}
        EditSheet={WorkSheet}
        itemType="Work Experience"
        onDelete={(id) => {
          setWork(works.filter((w) => w.id !== id))
        }}
      />
    </div>
  )
}
