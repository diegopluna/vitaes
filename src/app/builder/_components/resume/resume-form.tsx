import { PersonalForm } from './form/personal-form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AddressForm } from './form/address-form'
import { SummaryForm } from './form/summary-form'
import { ProfilesForm } from './form/profiles-form'
import { ProfileModal } from './form/modals/profile-modal'
import { useResumeSections } from '@/hooks/use-resume-sections'
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
            {section.id === 'profiles' ? (
              <div className="flex flex-row w-full justify-between items-center">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                <ProfileModal />
              </div>
            ) : (
              <h2 className="text-2xl font-semibold">{section.title}</h2>
            )}
            {section.id === 'personal' && <PersonalForm />}
            {section.id === 'address' && <AddressForm />}
            {section.id === 'summary' && <SummaryForm />}
            {section.id === 'profiles' && <ProfilesForm />}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
