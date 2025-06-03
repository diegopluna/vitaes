import type { Resume } from '@/@types/resume'
import { A4ResumeOnly } from './a4-resume-only'
import { ResumeAll } from './resume-all'

type Props = {
	resume: Resume
}

export function ResumeOnly({ resume }: Props) {
	return (
		<A4ResumeOnly>
			<ResumeAll resume={resume} />
		</A4ResumeOnly>
	)
}
