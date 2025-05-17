import UbagaCV from '@/templates/ubaga-cv'
import AwesomeCV from '@/templates/awesome-cv/'
import type { Resume } from '@/@types/resume'

type Props = { resume: Resume }

export function ResumeAll({ resume }: Props) {
  return (
    <>
      {resume.settings.model === 'awesome-cv' && <AwesomeCV resume={resume} />}
      {resume.settings.model === 'ubaga-cv' && <UbagaCV resume={resume} />}
    </>
  )
}
