'use client'

import {
  IconBrandGithubFilled,
  IconBrandGoogleFilled,
  IconLoader,
} from '@tabler/icons-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'

export default function Page() {
  const t = useTranslations('login')

  const [isGoogleLoading, startGoogleTransition] = useTransition()
  const [isGithubLoading, startGithubTransition] = useTransition()

  const isLoading = isGoogleLoading || isGithubLoading

  function socialSignIn(provider: 'google' | 'github') {
    if (provider === 'google') {
      startGoogleTransition(() => {
        authClient.signIn.social({
          provider,
        })
      })
      return
    }
    if (provider === 'github') {
      startGithubTransition(() => {
        authClient.signIn.social({
          provider,
        })
      })
      return
    }
    throw new Error('Invalid provider')
  }

  return (
    <div className="flex w-full justify-center items-center h-screen">
      <div className="w-[22rem]">
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src="/logo.svg"
            alt="Vitaes"
            width={48}
            height={48}
            className="size-12 bg-gradient-to-tr border border-secondary from-background via-muted/90 to-background rounded-lg mr-2"
          />
          <h3 className="m-0 font-semibold text-lg text-wrap text-muted-foreground">
            {t('welcome')}
          </h3>
          <Button
            variant="secondary"
            className="w-full"
            disabled={isLoading}
            onClick={() => socialSignIn('google')}
          >
            {isGoogleLoading ? (
              <IconLoader className="mr-2 size-4 animate-spin" />
            ) : (
              <IconBrandGoogleFilled className="mr-2 size-4" />
            )}
            {t('google')}
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            disabled={isLoading}
            onClick={() => socialSignIn('github')}
          >
            {isGithubLoading ? (
              <IconLoader className="mr-2 size-4 animate-spin" />
            ) : (
              <IconBrandGithubFilled className="mr-2 size-4" />
            )}
            {t('github')}
          </Button>
        </div>
      </div>
    </div>
  )
}
