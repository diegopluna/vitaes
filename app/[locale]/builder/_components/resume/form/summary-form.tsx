'use client'

import { Textarea } from '@/components/ui/textarea'
import { useResumeStore } from '@/providers/resume-store-provider'

export const SummaryForm = () => {
  const { resume, setResumeField } = useResumeStore(s => s)
  const summary = resume.basics.summary || { label: 'Summary', content: '' }

  return (
    <div className="flex px-2">
      <div className="w-full">
        <Textarea
          id="summary"
          value={summary.content}
          onChange={e =>
            setResumeField('basics', {
              ...resume.basics,
              summary: {
                ...summary,
                content: e.target.value,
              },
            })
          }
        />
      </div>
    </div>
  )
}
