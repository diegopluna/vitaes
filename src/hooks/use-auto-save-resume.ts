import type { Resume } from '@/@types/resume'
import { useUpdateResume } from '@/api/mutations'
import { isDeepEqual } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

export function useAutoSaveResume(
	resume?: Resume,
	resumeId?: string,
	resumeName?: string,
) {
	const {
		mutate: updateResumeData,
		isPending,
		isError,
		error,
	} = useUpdateResume({
		onSuccess: () => {
			setLastSaved(new Date())
		},
	})

	const timer = useRef<NodeJS.Timeout | null>(null)
	const [lastSaved, setLastSaved] = useState<Date | null>(null)
	const lastResumeRef = useRef<Resume | null>(null)

	useEffect(() => {
		// Only run if resume has changed
		if (
			!resume ||
			!resumeId ||
			!resumeName ||
			isDeepEqual(resume, lastResumeRef.current)
		)
			return

		lastResumeRef.current = resume

		if (timer.current) clearTimeout(timer.current)
		timer.current = setTimeout(() => {
			updateResumeData({
				data: {
					id: resumeId,
					name: resumeName,
					resumeData: resume,
				},
			})
		}, 2000) // 2 seconds debounce

		return () => {
			if (timer.current) clearTimeout(timer.current)
		}
	}, [resume, resumeId, resumeName, updateResumeData])

	return {
		isPending,
		isError,
		error,
		lastSaved,
	}
}
