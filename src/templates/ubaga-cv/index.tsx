import type { Resume } from '@/@types/resume'

type Props = {
	resume: Resume
}

export default function UbagaCV({ resume }: Props) {
	return (
		<div style={{ color: resume.settings.ubagaCV.textColor }}>
			<h1>
				{resume.basics.firstName} {resume.basics.lastName}
			</h1>
		</div>
	)
}
