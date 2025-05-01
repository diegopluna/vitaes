'use client'
import { Button } from '@/components/ui/button'
import { useAuthState } from '@/providers/auth-state-provider'
import { useTranslations } from 'next-intl'

export function SentView() {
  const t = useTranslations('EmailSent')
  const { email, setEmail, setStep } = useAuthState()

  function returnToSignIn() {
    setEmail('')
    setStep('email')
  }

  return (
    <div className="w-[22rem]">
      <div className="flex flex-col items-center justify-start gap-4">
        <h3 className="m-0 font-semibold text-xl text-wrap text-muted-foreground">
          {t('title')}
        </h3>
        <p className="text-muted-foreground">
          {t('email-sent', { email })}
          <Button
            className="text-muted-foreground p-0"
            type="button"
            size="sm"
            variant="link"
            onClick={returnToSignIn}
          >
            {t('not-you')}
          </Button>
        </p>
      </div>
    </div>
  )
}
