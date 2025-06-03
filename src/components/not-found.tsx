import { m } from '@/paraglide/messages'

export function NotFound() {
	return (
		<div className="space-y-2 p-2">
			<p>{m['not-found.description']()}</p>
		</div>
	)
}
