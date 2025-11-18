import type { IResume } from '@vitaes/types/resume'
import { AwesomeTemplate } from '../templates/awesome'
import { ModernTemplate } from '../templates/modern'
import { ProfessionalTemplate } from '../templates/professional'
import { BoldTemplate } from '../templates/bold'

export const ResumePDF = ({ value }: { value: IResume }) => {
  const template = value.config.template ?? 'awesome'

  switch (template) {
    case 'awesome':
      return <AwesomeTemplate value={value} />
    case 'modern':
      return <ModernTemplate value={value} />
    case 'professional':
      return <ProfessionalTemplate value={value} />
    case 'bold':
      return <BoldTemplate value={value} />
    default:
      return <AwesomeTemplate value={value} />
  }
}
