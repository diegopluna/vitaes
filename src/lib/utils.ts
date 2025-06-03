import type { Resume } from '@/@types/resume'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function isDeepEqual(a: unknown, b: unknown): boolean {
	if (a === b) return true

	if (a === null || b === null) return a === b
	if (typeof a !== typeof b) return false

	if (typeof a !== 'object') return a === b

	if (Array.isArray(a) !== Array.isArray(b)) return false

	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false
		for (let i = 0; i < a.length; i++) {
			if (!isDeepEqual(a[i], b[i])) return false
		}
		return true
	}

	if (a && b && typeof a === 'object' && typeof b === 'object') {
		const keysA = Object.keys(a as Record<string, unknown>)
		const keysB = Object.keys(b as Record<string, unknown>)

		if (keysA.length !== keysB.length) return false

		for (const key of keysA) {
			if (!keysB.includes(key)) return false
			if (
				!isDeepEqual(
					(a as Record<string, unknown>)[key],
					(b as Record<string, unknown>)[key],
				)
			)
				return false
		}

		return true
	}

	return false
}

export const isResume = (o: unknown): o is Resume => {
	if (
		typeof o === 'object' &&
		o !== null &&
		'basics' in o &&
		'work' in o &&
		'honors' in o &&
		'presentations' in o &&
		'writings' in o &&
		'comittees' in o &&
		'education' in o &&
		'extracurriculars' in o &&
		'projects' in o &&
		'languages' in o &&
		'certificates' in o &&
		'settings' in o
	) {
		return true
	}
	return false
}
