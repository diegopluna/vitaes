import { Button } from '@vitaes/ui/components/button'
import { createFileRoute } from '@tanstack/react-router'
import {
  IconArrowLeft,
  IconBrandAppleFilled,
  IconBrandGithubFilled,
  IconBrandGoogleFilled,
} from '@tabler/icons-react'
import { LocalizedLink } from '@/components/localized-link'
import { getIntlayer } from 'intlayer'
import { useIntlayer } from 'react-intlayer'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { authClient } from '@/lib/auth-client'
import { tryCatch } from '@/lib/try-catch'
import { toast } from 'sonner'
import { useLocalizedNavigate } from '@/hooks/use-localized-navigate'

export const Route = createFileRoute('/{-$locale}/login/')({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params
    const metaContent = getIntlayer('login', locale)

    return {
      meta: [{ title: metaContent.meta.title }],
    }
  },
})

function RouteComponent() {
  const content = useIntlayer('login')
  const navigate = useLocalizedNavigate()

  async function loginWithProvider(provider: 'google' | 'apple' | 'github') {
    const result = await tryCatch(authClient.signIn.social({ provider }))
    if (result.error) {
      toast.error(result.error.message)
      return
    }
    navigate({ to: '/dashboard' })
  }

  return (
    <div className="flex flex-row h-screen">
      <div className="bg-[#111111] hidden lg:flex h-full w-5/8 p-15 items-start flex-col justify-between">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row gap-3 items-center">
            <img src="/logo.svg" className="size-12" />
            <span className="font-bold font-heading text-[22px]">Vitaes</span>
          </div>
          <LocaleSwitcher />
        </div>

        <div className="items-start flex flex-col gap-8 w-full">
          <span className="font-bold font-heading text-[44px] w-2/3">
            {content.texts.carrer}
          </span>

          <span className="text-base text-muted-foreground">
            {content.texts.build}
          </span>

          <div className="flex flex-col items-start gap-2">
            <div className="h-1 w-70 bg-primary" />
            <div className="h-1 w-50 bg-primary opacity-50" />
            <div className="h-1 w-35 bg-primary opacity-25" />
          </div>
        </div>

        <div></div>
      </div>
      <div className="h-full w-full lg:w-3/8 flex flex-col justify-between p-15 items-center">
        <div className="flex flex-row gap-2.5 items-center">
          <img src="/logo.svg" className="size-9 lg:hidden" />
          <span className="font-bold text-[22px] lg:hidden font-heading">
            Vitaes
          </span>
        </div>

        <div className="flex flex-col items-center gap-8 w-full">
          <div className="h-0.75 w-10 bg-primary" />
          <div className="flex flex-col items-center gap-3">
            <span className="font-bold text-[32px] font-heading">
              {content.texts.welcome}
            </span>
            <span className="text-muted-foreground text-[14px]">
              {content.texts.signIn}
            </span>
          </div>
          <div className="flex flex-col items-start gap-3 w-full">
            <Button
              className="w-full bg-white text-black hover:bg-white/80"
              size="lg"
              onClick={() => loginWithProvider('google')}
            >
              <IconBrandGoogleFilled className="size-5.5 mr-2.5 text-black" />
              {content.buttons.login({ provider: 'Google' })}
            </Button>
            <Button
              className="w-full bg-white text-black hover:bg-white/80"
              size="lg"
              onClick={() => loginWithProvider('apple')}
            >
              <IconBrandAppleFilled className="size-5.5 mr-2.5 text-black" />
              {content.buttons.login({ provider: 'Apple' })}
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              size="lg"
              onClick={() => loginWithProvider('github')}
            >
              <IconBrandGithubFilled className="size-5.5 mr-2.5" />
              {content.buttons.login({ provider: 'GitHub' })}
            </Button>
          </div>
        </div>

        <LocalizedLink
          to="/"
          className="flex flex-row items-center gap-1.5 text-primary text-[13px] hover:underline"
        >
          <IconArrowLeft className="size-3.5" />
          {content.links.back}
        </LocalizedLink>

        <div className="lg:hidden">
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  )
}
