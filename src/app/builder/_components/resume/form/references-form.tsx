'use client'

import { Reference } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResumeStore } from '@/providers/resume-store-provider'
import { ReferenceSheet } from './sheets/reference-sheet'

const referenceKey = Symbol('reference')

function getReferenceData(reference: Reference): ItemData<Reference> {
  return {
    [referenceKey]: true,
    itemId: reference.id,
  }
}

function isReferenceData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Reference> {
  return data[referenceKey] === true
}

const ReferencesDragList = DragList<Reference>

export const ReferencesForm = () => {
  const { resume, setReferences } = useResumeStore((state) => state)

  const references = resume.references

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {references.length === 0 && (
        <p className="text-center">No references added</p>
      )}
      <ReferencesDragList
        items={references}
        getItemData={getReferenceData}
        isItemData={isReferenceData}
        setItems={setReferences}
        EditModal={ReferenceSheet}
        itemType="reference"
        onDelete={(id) => {
          setReferences(references.filter((r) => r.id !== id))
        }}
      />
    </div>
  )
}
