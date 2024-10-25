import { Resume as JsonResume } from '@/@types/resume'
import { A4Paper } from '../a4-paper/a4-paper'
import { AwesomeCV } from './templates/awesome-cv/awesome-cv'

interface ResumeProps {
  resume: JsonResume
}

export const Resume = ({ resume }: ResumeProps) => {
  return (
    <A4Paper>
      <AwesomeCV resume={resume} />
    </A4Paper>
  )
}
