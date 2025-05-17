'use client'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { IconArrowRight } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export function Hero() {
  const { theme } = useTheme()

  const t = useTranslations('Landing')
  return (
    <section className="container mx-auto">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              {t('action')}
              <span className="text-transparent px-2 bg-gradient-to-r from-neutral-600 to-primary bg-clip-text">
                Vitaes
              </span>
            </h1>
          </div>
          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {t('sub-action')}
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button asChild className="w-5/6 md:w-1/4 font-bold group/arrow">
              <Link href="/dashboard">
                {t('action-button')}
                <IconArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative group mt-14">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 blur-3xl" />
          <Image
            width={1200}
            height={1200}
            className="w-full md:w-[1200px] mx-auto rounded-lg relative leading-none flex items-center border border-t-2 border-secondary border-t-primary/30"
            src={
              theme === 'light'
                ? '/hero-image-light.jpeg'
                : '/hero-image-dark.jpeg'
            }
            alt="dashboard"
          />
          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg" />
        </div>
      </div>
    </section>
  )
}
