import type { Resume } from '@/@types/resume'
import AwesomeCV from '@/templates/awesome-cv/'
import UbagaCV from '@/templates/ubaga-cv'

type Props = { resume: Resume }

export function ResumeAll({ resume }: Props) {
	return (
		<>
			{resume.settings.model === 'awesome-cv' && <AwesomeCV resume={resume} />}
			{resume.settings.model === 'ubaga-cv' && <UbagaCV resume={resume} />}
		</>
	)
}
