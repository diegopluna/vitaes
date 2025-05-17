import { Separator } from '@/components/ui/separator'
import { Link } from '@/i18n/navigation'
import NextLink from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

export async function Footer() {
  const t = await getTranslations('Landing')
  return (
    <footer id="footer" className="container mx-auto py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary">
        <div className="gap-6 items-center justify-between max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="col-span-full xl:col-span-2">
            <Link href="/" className="flex font-bold items-center">
              <Image src="/vitaes.svg" alt="Vitaes" width={36} height={36} />
              <h3 className="text-2xl">Vitaes</h3>
            </Link>
          </div>
          <Separator className="my-6 col-span-full" />
          <section className="col-span-full">
            <h3 className="">
              {t('footer')}
              <NextLink
                target="_blank"
                href="https://github.com/diegopluna"
                className="text-primary transition-all border-primary hover:border-b-2 ml-1"
              >
                diegopluna
              </NextLink>
            </h3>
          </section>
        </div>
      </div>
    </footer>
  )
}
