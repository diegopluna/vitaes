import { Roboto } from 'next/font/google'
import type { Resume } from '@/convex/resume/type'
import * as styles from './constants'
import ResumeCertificates from './resume-certificates'
import ResumeComittee from './resume-comittee'
import ResumeEducation from './resume-education'
import ResumeExperience from './resume-experience'
import ResumeExtracurricular from './resume-extracurricular'
import ResumeHeader from './resume-header'
import ResumeHonors from './resume-honors'
import ResumeLanguages from './resume-languages'
import ResumePresentations from './resume-presentations'
import ResumeProjects from './resume-projects'
import ResumeSummary from './resume-summary'
import ResumeWritings from './resume-writings'

type Props = {
  resume: Resume
}

const roboto = Roboto({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export default function AwesomeCV({ resume }: Props) {
  return (
    <div className={roboto.className} style={styles.textText}>
      <ResumeHeader resume={resume} />
      {resume.basics.summary.content.length > 0 && (
        <ResumeSummary resume={resume} />
      )}
      {resume.work.content.length > 0 && <ResumeExperience resume={resume} />}
      {resume.honors.content.length > 0 && <ResumeHonors resume={resume} />}
      {resume.presentations.content.length > 0 && (
        <ResumePresentations resume={resume} />
      )}
      {resume.writings.content.length > 0 && <ResumeWritings resume={resume} />}
      {resume.committees.content.length > 0 && (
        <ResumeComittee resume={resume} />
      )}
      {resume.education.content.length > 0 && (
        <ResumeEducation resume={resume} />
      )}
      {resume.extracurriculars.content.length > 0 && (
        <ResumeExtracurricular resume={resume} />
      )}
      {resume.projects.content.length > 0 && <ResumeProjects resume={resume} />}
      {resume.languages.content.length > 0 && (
        <ResumeLanguages resume={resume} />
      )}
      {resume.certificates.content.length > 0 && (
        <ResumeCertificates resume={resume} />
      )}
    </div>
  )
}
