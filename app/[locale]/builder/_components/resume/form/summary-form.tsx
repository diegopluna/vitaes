'use client'

import { Textarea } from '@/components/ui/textarea'
import { useResumeStore } from '@/providers/resume-store-provider'

export const SummaryForm = () => {
  const { resume, setResumeField } = useResumeStore(s => s)
  const { summary } = resume.basics

  return (
    <div className="flex px-2">
      <div className="w-full">
        <Textarea
          id="summary"
          value={summary}
          onChange={e =>
            setResumeField('basics', {
              ...resume.basics,
              summary: e.target.value,
            })
          }
        />
      </div>
    </div>
  )
}
