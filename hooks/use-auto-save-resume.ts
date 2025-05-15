import { useEffect, useRef, useState } from 'react'
import { api } from '@/trpc/react'
import type { Resume } from '@/@types/resume'
import isEqual from 'lodash.isequal'

export function useAutoSaveResume(
  resume: Resume | undefined,
  resumeId: string | undefined,
  resumeName: string | undefined,
) {
  const {
    mutate: updateResume,
    isPending,
    isError,
    error,
  } = api.resume.update.useMutation({
    onSuccess: () => {
      setLastSaved(new Date())
    },
  })
  const timer = useRef<NodeJS.Timeout | null>(null)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const lastResumeRef = useRef<Resume | undefined>(resume)

  useEffect(() => {
    // Only autosave if resume data actually changed
    if (
      !resume ||
      !resumeId ||
      !resumeName ||
      isEqual(resume, lastResumeRef.current)
    )
      return

    lastResumeRef.current = resume

    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      updateResume({
        id: resumeId,
        data: resume,
        name: resumeName,
      })
    }, 2000) // 2 seconds debounce

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [resume, resumeId, resumeName, updateResume])

  return { isPending, isError, error, lastSaved }
}
