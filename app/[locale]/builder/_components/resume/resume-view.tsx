'use client'

import A4Paper from './a4-paper'
import type { Resume } from '@/@types/resume'
import { ResumeAll } from './resume-all'

type Props = {
  resume: Resume
}

export default function ResumeView({ resume }: Props) {
  return (
    <A4Paper>
      <ResumeAll resume={resume} />
    </A4Paper>
  )
}
