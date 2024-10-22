import { useSections } from '@/hooks/use-sections'
import { sections } from './sections'
import { BasicsForm } from './form/basics-form'

export const ResumeForm = () => {
  const sectionsContext = useSections()
  if (!sectionsContext) {
    return null
  }
  const { setSectionRef } = sectionsContext

  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <div
          key={section.id}
          ref={(el) => setSectionRef(section.id, el)}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold">{section.title}</h2>
          {section.id === 'personal' && <BasicsForm />}
        </div>
      ))}
    </div>
  )
}
