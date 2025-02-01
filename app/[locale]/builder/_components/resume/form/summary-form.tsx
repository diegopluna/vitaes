'use client'

import { Textarea } from '@/components/ui/textarea'
import { useResume } from '@/providers/resume-provider'

export const SummaryForm = () => {
  const { resume, setBasics } = useResume()
  const { summary } = resume.basics

  return (
    <div className="flex px-2">
      <div className="w-full">
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) =>
            setBasics({
              ...resume.basics,
              summary: e.target.value,
            })
          }
        />
      </div>
    </div>
  )
}
