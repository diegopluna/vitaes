'use client'

import { Language } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { useResume } from '@/providers/resume-provider'
import { LanguagesSheet } from './sheets/languages-sheet'

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

const LanguageDragList = DragList<Language>

export const LanguagesForm = () => {
  const { resume, setLanguages } = useResume()

  const languages = resume.languages
  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {languages.length === 0 && (
        <p className="text-center">No languages added</p>
      )}
      <LanguageDragList
        items={languages}
        getItemData={getLanguageData}
        isItemData={isLanguageData}
        setItems={setLanguages}
        EditSheet={LanguagesSheet}
        itemType="Language"
        onDelete={(id) => {
          setLanguages(languages.filter((w) => w.id !== id))
        }}
      />
    </div>
  )
}
