'use client'

import { Language } from '@/@types/resume'
import { ItemData } from './dnd/drag'
import { DragList } from './dnd/list'
import { LanguageSheet } from './sheets/language-sheet'
import { useResumeStore } from '@/providers/resume-store-provider'

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

export const LanguageForm = () => {
  const { resume, setResumeField } = useResumeStore(s => s)

  const languages = resume.languages

  return (
    <div className="flex flex-col w-full gap-2 px-2 items-center">
      {languages.length === 0 && (
        <p className="text-center">No language added</p>
      )}
      <LanguageDragList
        items={languages}
        getItemData={getLanguageData}
        isItemData={isLanguageData}
        setItems={setResumeField.bind(null, 'languages')}
        EditSheet={LanguageSheet}
        itemType="Language Experience"
        onDelete={id => {
          setResumeField(
            'languages',
            languages.filter(w => w.id !== id),
          )
        }}
      />
    </div>
  )
}
