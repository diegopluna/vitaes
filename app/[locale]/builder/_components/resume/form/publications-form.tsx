'use client'

import { Publication } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResume } from '@/providers/resume-provider'
import { PublicationsSheet } from './sheets/publications-sheet'

const publicationKey = Symbol('publication')

function getPublicationData(publication: Publication): ItemData<Publication> {
  return {
    [publicationKey]: true,
    itemId: publication.id,
  }
}

function isPublicationData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Publication> {
  return data[publicationKey] === true
}

const PublicationDragList = DragList<Publication>

export const PublicationsForm = () => {
  const { resume, setPublications } = useResume()

  const publications = resume.publications

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {publications.length === 0 && (
        <p className="text-center">No publications added</p>
      )}
      <PublicationDragList
        items={publications}
        getItemData={getPublicationData}
        isItemData={isPublicationData}
        setItems={setPublications}
        EditSheet={PublicationsSheet}
        itemType="Publication"
        onDelete={(id) => {
          setPublications(publications.filter((w) => w.id !== id))
        }}
      />
    </div>
  )
}
