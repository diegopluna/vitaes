'use client'

import { Comittee } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { ComitteeSheet } from './sheets/comittee-sheet'
import { useResumeStore } from '@/providers/resume-store-provider'

const comitteeKey = Symbol('comittee')

function getComitteeData(comittee: Comittee): ItemData<Comittee> {
  return {
    [comitteeKey]: true,
    itemId: comittee.id,
  }
}

function isComitteeData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Comittee> {
  return data[comitteeKey] === true
}

const ComitteeDragList = DragList<Comittee>

export const ComitteeForm = () => {
  const { resume, setResumeField } = useResumeStore(s => s)

  const comittees = resume.comittees

  console.log('comittees', comittees)

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {comittees.length === 0 && (
        <p className="text-center">No comittees added</p>
      )}
      <ComitteeDragList
        items={comittees}
        getItemData={getComitteeData}
        isItemData={isComitteeData}
        setItems={setResumeField.bind(null, 'comittees')}
        EditSheet={ComitteeSheet}
        itemType="Comittee Experience"
        onDelete={id => {
          setResumeField(
            'comittees',
            comittees.filter(w => w.id !== id),
          )
        }}
      />
    </div>
  )
}
