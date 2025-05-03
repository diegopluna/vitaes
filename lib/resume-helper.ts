import type { Resume } from '@/@types/resume'

// TODO: Improve this type guard
export const isResume = (o: unknown): o is Resume => {
  if (
    typeof o === 'object' &&
    o !== null &&
    'basics' in o &&
    'work' in o &&
    'honors' in o &&
    'presentations' in o &&
    'writings' in o &&
    'comittees' in o &&
    'education' in o &&
    'extracurriculars' in o &&
    'projects' in o &&
    'languages' in o &&
    'certificates' in o &&
    'settings' in o
  ) {
    return true
  }
  return false
}
