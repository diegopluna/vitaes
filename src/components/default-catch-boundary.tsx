import {
	ErrorComponent,
	type ErrorComponentProps,
} from '@tanstack/react-router'

export function DefaultCatchBoundary({ error }: Readonly<ErrorComponentProps>) {
	console.error(error)

	return (
		<div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 p-4">
			<ErrorComponent error={error} />
		</div>
	)
}
