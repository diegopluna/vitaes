import { useMutation } from '@tanstack/react-query'
import { updateResume } from './resume'

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
