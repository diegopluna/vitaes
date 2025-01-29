import { Separator } from '@/components/ui/separator'
import { Link } from '@/i18n/routing'
import NextLink from 'next/link'
import Image from 'next/image'

export const Footer = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Link href="/" className="flex font-bold items-center">
              <Image
                src="/vitaes.svg"
                alt="Vitaes"
                className="bg-gradient-to-tr border border-secondary from-background via-muted/90 to-background rounded-lg mr-2"
                width={36}
                height={36}
              />
              <h3 className="text-2xl">Vitaes</h3>
            </Link>
          </div>

          <Separator className="my-6" />
          <section className="">
            <h3 className="">
              &copy; 2025 Designed and developed by
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
