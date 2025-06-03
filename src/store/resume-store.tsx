import { createJSONStorage, persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

import type { Resume } from '@/@types/resume'

export type ResumeState = {
	resume: Resume
}

export type ResumeActions = {
	setResume: (resume: Resume) => void
	setResumeField: <K extends keyof Resume>(key: K, value: Resume[K]) => void
}

export type ResumeStore = ResumeState & ResumeActions

export const createResumeStore = (resumeId: string, initState: ResumeState) => {
	const storageKey = `vitaes-resume-${resumeId}`
	return createStore<ResumeStore>()(
		persist(
			(set) => ({
				...initState,
				setResume: (resume) => set({ resume }),
				setResumeField: (key, value) =>
					set((state) => ({
						resume: {
							...state.resume,
							[key]: value,
						},
					})),
			}),
			{
				name: storageKey,
				storage: createJSONStorage(() => localStorage),
			},
		),
	)
}
