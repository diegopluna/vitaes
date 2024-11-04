import { PersonalForm } from './form/personal-form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AddressForm } from './form/address-form'
import { SummaryForm } from './form/summary-form'
import { ProfilesForm } from './form/profiles-form'
import { useResumeSections } from '@/hooks/use-resume-sections'
import { WorkForm } from './form/work-form'
// import { BasicsForm } from './form/basics-form'

export const ResumeForm = () => {
  const { sections, setSectionRef } = useResumeSections()
  return (
    <ScrollArea>
      <div className="space-y-12">
        {sections.map((section) => (
          <div
            key={section.id}
            ref={(el) => setSectionRef(section.id, el)}
            className="space-y-6"
          >
            {section.modal ? (
              <div className="flex flex-row w-full justify-between items-center">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                {section.modal}
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
