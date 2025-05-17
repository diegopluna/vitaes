import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Link } from '@/i18n/navigation'
import NextLink from 'next/link'
import { IconBrandGithubFilled, IconMenu } from '@tabler/icons-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { LanguageSelector } from '@/components/language-selector'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { useTranslations } from 'next-intl'

export const Navbar = () => {
  const t = useTranslations('Navbar')
  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-screen-xl top-5 mx-auto sticky border border-secondary z-40 flex justify-between items-center p-2 bg-card">
      <Link href="/" className="font-bold text-lg flex items-center">
        <Image src="/vitaes.svg" alt="Vitaes" width={36} height={36} />
        Vitaes
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet>
          <SheetTrigger>
            <IconMenu className="cursor-pointer lg:hidden" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col justify-between bg-card border-secondary"
          >
            <>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/vitaes.svg"
                      alt="Vitaes"
                      width={36}
                      height={36}
                    />
                    Vitaes
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2"></div>
            </>
            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />
              <LanguageSelector />
              <ModeToggle />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList></NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex">
        <LanguageSelector />
        <ModeToggle />
        <Button
          asChild
          size="sm"
          variant="ghost"
          aria-label={t('viewOnGithub')}
        >
          <NextLink
            aria-label={t('viewOnGithub')}
            href="https://github.com/diegopluna/vitaes"
            target="_blank"
          >
            <IconBrandGithubFilled className="size-5" />
          </NextLink>
        </Button>
      </div>
    </header>
  )
}
