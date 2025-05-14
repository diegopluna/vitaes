'use client'

import { Extracurricular } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { ExtracurricularSheet } from './sheets/extracurricular-sheet'
import { useResumeStore } from '@/providers/resume-store-provider'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('ExtracurricularForm')

  const extracurriculars = resume.extracurriculars

  function setExtracurriculars(extracurriculars: Extracurricular[]) {
    setResumeField('extracurriculars', {
      ...resume.extracurriculars,
      content: extracurriculars,
    })
  }

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {extracurriculars.content.length === 0 && (
        <p className="text-center">
          {t('noneAdded', { label: extracurriculars.label })}
        </p>
      )}
      <ExtracurricularDragList
        items={extracurriculars.content}
        getItemData={getExtracurricularData}
        isItemData={isExtracurricularData}
        setItems={setExtracurriculars}
        EditSheet={ExtracurricularSheet}
        itemType="Extracurricular"
        onDelete={id => {
          setResumeField('extracurriculars', {
            ...resume.extracurriculars,
            content: resume.extracurriculars.content.filter(
              extracurricular => extracurricular.id !== id,
            ),
          })
        }}
      />
    </div>
  )
}
