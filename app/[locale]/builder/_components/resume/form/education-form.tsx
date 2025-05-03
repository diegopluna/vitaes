'use client'

import { Education } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { EducationSheet } from './sheets/education-sheet'
import { useResumeStore } from '@/providers/resume-store-provider'

const educationKey = Symbol('education')

function getEducationData(education: Education): ItemData<Education> {
  return {
    [educationKey]: true,
    itemId: education.id,
  }
}

function isEducationData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Education> {
  return data[educationKey] === true
}

const EducationDragList = DragList<Education>

export const EducationForm = () => {
  const { resume, setResumeField } = useResumeStore(s => s)

  const educations = resume.education

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {educations.length === 0 && (
        <p className="text-center">No education added</p>
      )}
      <EducationDragList
        items={educations}
        getItemData={getEducationData}
        isItemData={isEducationData}
        setItems={setResumeField.bind(null, 'education')}
        EditSheet={EducationSheet}
        itemType="Education"
        onDelete={id => {
          setResumeField(
            'education',
            educations.filter(w => w.id !== id),
          )
        }}
      />
    </div>
  )
}
