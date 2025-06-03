import type { Language } from '@/@types/resume'
import { m } from '@/paraglide/messages'
import { useResumeStore } from '@/providers/resume-store-provider'
import type { ItemData } from '../dnd/drag'
import { DragList } from '../dnd/list'
import { LanguageSheet } from '../sheet/language-sheet'

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

export function LanguageForm() {
	const { resume, setResumeField } = useResumeStore((s) => s)
	const languages = resume.languages

	const setLanguages = (languages: Language[]) => {
		setResumeField('languages', {
			...resume.languages,
			content: languages,
		})
	}

	return (
		<div className="flex flex-col w-full gap-2 px-2 items-center">
			{languages.content.length === 0 && (
				<p className="text-center">
					{m['language-form.no-languages-added']({ label: languages.label })}
				</p>
			)}
			<LanguageDragList
				items={languages.content}
				getItemData={getLanguageData}
				isItemData={isLanguageData}
				setItems={setLanguages}
				EditSheet={LanguageSheet}
				itemType={languages.label}
				onDelete={(id) => {
					setResumeField('languages', {
						...resume.languages,
						content: resume.languages.content.filter(
							(language) => language.id !== id,
						),
					})
				}}
			/>
		</div>
	)
}
