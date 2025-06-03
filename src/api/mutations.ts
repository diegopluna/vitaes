import { useMutation } from '@tanstack/react-query'
import { cloneResume, deleteResume, updateResume } from './resume'

export const useUpdateResume = ({
	onSuccess,
}: {
	onSuccess?: () => void
}) => {
	return useMutation({
		mutationFn: updateResume,
		onSuccess,
	})
}

export const useDeleteResume = ({
	onSuccess,
}: {
	onSuccess?: () => void
}) => {
	return useMutation({
		mutationFn: deleteResume,
		onSuccess,
	})
}

export const useCloneResume = ({
	onSuccess,
}: {
	onSuccess?: () => void
}) => {
	return useMutation({
		mutationFn: cloneResume,
		onSuccess,
	})
}
