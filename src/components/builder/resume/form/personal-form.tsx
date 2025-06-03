import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { m } from '@/paraglide/messages'
import { useResumeStore } from '@/providers/resume-store-provider'

export function PersonalForm() {
	const { resume, setResumeField } = useResumeStore((s) => s)
	const { basics } = resume

	return (
		<div className="grid gap-4 sm:grid-cols-2 px-2">
			<div className="grid gap-2">
				<Label htmlFor="firstName">{m['personal-form.first-name']()}</Label>
				<Input
					id="firstName"
					value={basics.firstName}
					onChange={(e) =>
						setResumeField('basics', { ...basics, firstName: e.target.value })
					}
					placeholder={m['personal-form.first-name-placeholder']()}
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="lastName">{m['personal-form.last-name']()}</Label>
				<Input
					id="lastName"
					value={basics.lastName}
					onChange={(e) =>
						setResumeField('basics', { ...basics, lastName: e.target.value })
					}
					placeholder={m['personal-form.last-name-placeholder']()}
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="phone">{m['personal-form.phone']()}</Label>
				<Input
					id="phone"
					placeholder={m['personal-form.phone-placeholder']()}
					value={basics.phone}
					onChange={(e) =>
						setResumeField('basics', { ...basics, phone: e.target.value })
					}
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="email">{m['personal-form.email']()}</Label>
				<Input
					id="email"
					value={basics.email}
					onChange={(e) =>
						setResumeField('basics', { ...basics, email: e.target.value })
					}
					placeholder={m['personal-form.email-placeholder']()}
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="url">{m['personal-form.url']()}</Label>
				<Input
					id="url"
					value={basics.url}
					onChange={(e) =>
						setResumeField('basics', { ...basics, url: e.target.value })
					}
					placeholder={m['personal-form.url-placeholder']()}
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="quote">{m['personal-form.quote']()}</Label>
				<Input
					id="quote"
					value={basics.quote}
					onChange={(e) =>
						setResumeField('basics', { ...basics, quote: e.target.value })
					}
					placeholder={m['personal-form.quote-placeholder']()}
				/>
			</div>
		</div>
	)
}
