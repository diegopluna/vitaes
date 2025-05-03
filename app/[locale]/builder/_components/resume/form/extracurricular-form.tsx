'use client'

import { Extracurricular } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { ExtracurricularSheet } from './sheets/extracurricular-sheet'
import { useResumeStore } from '@/providers/resume-store-provider'

const extracurricularKey = Symbol('extracurricular')

function getExtracurricularData(
  extracurricular: Extracurricular,
): ItemData<Extracurricular> {
  return {
    [extracurricularKey]: true,
    itemId: extracurricular.id,
  }
}

function isExtracurricularData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Extracurricular> {
  return data[extracurricularKey] === true
}

const ExtracurricularDragList = DragList<Extracurricular>

export const ExtracurricularForm = () => {
  const { resume, setResumeField } = useResumeStore(s => s)

  const extracurriculars = resume.extracurriculars

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {extracurriculars.length === 0 && (
        <p className="text-center">No extracurricular added</p>
      )}
      <ExtracurricularDragList
        items={extracurriculars}
        getItemData={getExtracurricularData}
        isItemData={isExtracurricularData}
        setItems={setResumeField.bind(null, 'extracurriculars')}
        EditSheet={ExtracurricularSheet}
        itemType="Extracurricular"
        onDelete={id => {
          setResumeField(
            'extracurriculars',
            extracurriculars.filter(w => w.id !== id),
          )
        }}
      />
    </div>
  )
}
