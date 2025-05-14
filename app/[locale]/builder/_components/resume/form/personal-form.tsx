'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useResumeStore } from '@/providers/resume-store-provider'
import { useTranslations } from 'next-intl'

export const PersonalForm = () => {
  const { resume, setResumeField } = useResumeStore(s => s)
  const { basics } = resume
  const t = useTranslations('PersonalForm')

  return (
    <div className="grid gap-4 sm:grid-cols-2 px-2">
      <div className="grid gap-2">
        <Label htmlFor="firstName">{t('firstName')}</Label>
        <Input
          id="firstName"
          value={basics.firstName}
          onChange={e =>
            setResumeField('basics', { ...basics, firstName: e.target.value })
          }
          placeholder={t('firstNamePlaceholder')}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lastName">{t('lastName')}</Label>
        <Input
          id="lastName"
          value={basics.lastName}
          onChange={e =>
            setResumeField('basics', { ...basics, lastName: e.target.value })
          }
          placeholder={t('lastNamePlaceholder')}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">{t('phone')}</Label>
        <Input
          id="phone"
          placeholder={t('phonePlaceholder')}
          value={basics.phone}
          onChange={e =>
            setResumeField('basics', { ...basics, phone: e.target.value })
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">{t('email')}</Label>
        <Input
          id="email"
          value={basics.email}
          onChange={e =>
            setResumeField('basics', { ...basics, email: e.target.value })
          }
          placeholder={t('emailPlaceholder')}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="url">{t('url')}</Label>
        <Input
          id="url"
          value={basics.url}
          onChange={e =>
            setResumeField('basics', { ...basics, url: e.target.value })
          }
          placeholder={t('urlPlaceholder')}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="quote">{t('quote')}</Label>
        <Input
          id="quote"
          value={basics.quote}
          onChange={e =>
            setResumeField('basics', { ...basics, quote: e.target.value })
          }
          placeholder={t('quotePlaceholder')}
        />
      </div>
    </div>
  )
}
