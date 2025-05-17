'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppForm } from '@/components/ui/ts-form'
import { useRouter } from '@/i18n/navigation'
import { authClient } from '@/lib/auth-client'
import { useAuthState } from '@/providers/auth-state-provider'
import {
  IconBrandGithubFilled,
  IconBrandGoogleFilled,
  IconKey,
  IconLoader2,
} from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useTransition } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

const socialSignIn = async (provider: 'github' | 'google') => {
  await authClient.signIn.social({
    provider,
  })
}

async function signInWithPasskey() {
  await authClient.signIn.passkey()
}

export function LoginForm() {
  const router = useRouter()
  const t = useTranslations('LoginForm')
  const { setStep, setEmail } = useAuthState()
  const [isLoading, startTransition] = useTransition()

  const emailSchema = z.object({
    email: z
      .string()
      .min(1, { message: t('email-required') })
      .email({ message: t('email-valid') }),
  })

  const sendMagicLink = async (email: string) => {
    await authClient.signIn.magicLink({
      email,
      callbackURL: '/dashboard',
      fetchOptions: {
        onError: async context => {
          const { response } = context
          if (response.status === 429) {
            const retryAfter = response.headers.get('X-Retry-After')!
            toast.error(t('toast-rate-limit', { retryAfter }))
            throw new Error('Rate limit exceeded')
          } else {
            toast.error(t('failed-to-send'))
            throw new Error('Failed to send magic link')
          }
        },
      },
    })
  }

  async function signInAsGuest() {
    await authClient.signIn.anonymous({
      fetchOptions: {
        onSuccess: () => {
          router.push('/dashboard')
        },
      },
    })
  }

  const form = useAppForm({
    validators: {
      onChange: emailSchema,
    },
    defaultValues: {
      email: '',
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        await sendMagicLink(value.email)
          .then(() => {
            setEmail(value.email)
            setStep('sent')
          })
          .catch(() => {
            return
          })
      })
    },
  })

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    },
    [form],
  )

  return (
    <div className="w-[22rem] ">
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src="/vitaes.svg"
          alt="Vitaes"
          className="bg-gradient-to-tr border border-secondary from-background via-muted/90 to-background rounded-lg mr-2"
          width={48}
          height={48}
        />
        <h3 className="m-0 font-semibold text-lg text-wrap text-muted-foreground">
          {t('welcome')}
        </h3>
        <Button
          onClick={() => socialSignIn('google')}
          variant="secondary"
          className="w-full"
          disabled={isLoading}
        >
          <IconBrandGoogleFilled className="mr-2 h-4 w-4" />
          {t('google')}
        </Button>
        <Button
          onClick={() => socialSignIn('github')}
          variant="secondary"
          className="w-full"
          disabled={isLoading}
        >
          <IconBrandGithubFilled className="mr-2 h-4 w-4" />
          {t('github')}
        </Button>
        <Button
          onClick={() => signInWithPasskey()}
          className="w-full"
          variant="secondary"
        >
          <IconKey className="mr-2 h-4 w-4" />
          {t('passkey')}
        </Button>
      </div>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t('or')}
          </span>
        </div>
      </div>
      <form.AppForm>
        <form
          className="flex flex-col align-center justify-start gap-4"
          onSubmit={handleSubmit}
        >
          <form.AppField
            name="email"
            children={field => (
              <field.FormItem>
                <field.FormControl>
                  <Input
                    placeholder={t('email-placeholder')}
                    type="email"
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
              </field.FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <IconLoader2 className="w-6 h-6 animate-spin" />
            ) : (
              t('sign-in')
            )}
          </Button>
        </form>
      </form.AppForm>
      <Button
        onClick={() => signInAsGuest()}
        className="w-full hover:cursor-pointer mt-2"
        variant="link"
      >
        {t('guest')}
      </Button>
    </div>
  )
}
