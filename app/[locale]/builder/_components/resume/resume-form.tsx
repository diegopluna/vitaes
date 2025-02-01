'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useSections } from '@/providers/sections-provider'

export const ResumeForm = () => {
  const { sections, setSectionRef } = useSections()
  return (
    <ScrollArea>
      <div className="space-y-12">
        {sections.map((section) => (
          <div
            className="space-y-6"
            key={section.id}
            ref={(el) => setSectionRef(section.id, el)}
          >
            {section.sheet ? (
              <div className="flex flex-row w-full justify-between items-center">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                {section.sheet}
              </div>
            ) : (
              <h2 className="text-2xl font-semibold">{section.title}</h2>
            )}
            {section.form}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
