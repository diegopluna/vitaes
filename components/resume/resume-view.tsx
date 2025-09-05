import type { Resume } from '@/convex/resume/type'
import { A4Paper } from './a4-paper'
import AwesomeCV from './templates/awesome-cv'

type Props = {
  resume: Resume
  fullPage?: boolean
}

export default function ResumeView({ resume, fullPage = false }: Props) {
  return (
    <A4Paper fullPage={fullPage}>
      {resume.settings.model === 'awesome-cv' && <AwesomeCV resume={resume} />}
    </A4Paper>
  )
}
