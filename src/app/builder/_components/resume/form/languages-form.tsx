'use client'

import { Language } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResumeStore } from '@/providers/resume-store-provider'
import { LanguageSheet } from './sheets/language-sheet'

const languageKey = Symbol('language')

function getLanguageData(language: Language): ItemData<Language> {
  return {
    [languageKey]: true,
    itemId: language.id,
  }
}

function isLanguageData(
  data: Record<string | symbol, unknown>,
): data is ItemData<Language> {
  return data[languageKey] === true
}

const LanguagesDragList = DragList<Language>

export const LanguagesForm = () => {
  const { resume, setLanguages } = useResumeStore((state) => state)

  const languages = resume.languages

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {languages.length === 0 && (
        <p className="text-center">No languages added</p>
      )}
      <LanguagesDragList
        items={languages}
        getItemData={getLanguageData}
        isItemData={isLanguageData}
        setItems={setLanguages}
        itemType="language"
        onDelete={(id) => {
          setLanguages(languages.filter((l) => l.id !== id))
        }}
        EditModal={LanguageSheet}
      />
    </div>
  )
}
