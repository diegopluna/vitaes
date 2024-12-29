'use client'

import Image from 'next/image'
import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'
import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import {
  NavigationMenu,
  // NavigationMenuContent,
  // NavigationMenuItem,
  NavigationMenuList,
  // NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { UserButton } from './user-button'
import { User } from 'better-auth'

export const Navbar = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link href="/" className="font-bold text-lg flex items-center">
        <Image
          src="/vitaes.svg"
          alt="Vitaes"
          className="bg-gradient-to-tr border-secondary from-background via-muted/90 to-background rounded-lg mr-2 border"
          width={36}
          height={36}
        />
        Vitaes
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/vitaes.svg"
                      alt="Vitaes"
                      className="bg-gradient-to-tr border border-secondary from-background via-muted/90 to-background rounded-lg mr-2"
                      width={36}
                      height={36}
                    />
                    Vitaes
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {/* {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))} */}
              </div>
            </div>
            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />

              <ModeToggle />
              <UserButton user={user} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-card text-base">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[600px] grid-cols-2 gap-5 p-4">
                <Image
                  src="https://avatars.githubusercontent.com/u/75042455?v=4"
                  alt="RadixLogo"
                  className="h-full w-full rounded-md object-cover"
                  width={600}
                  height={600}
                />
                <ul className="flex flex-col gap-2">
                  {featureList.map(({ title, description }) => (
                    <li
                      key={title}
                      className="rounded-md p-3 text-sm hover:bg-muted"
                    >
                      <p className="mb-1 font-semibold leading-none text-foreground">
                        {title}
                      </p>
                      <p className="line-clamp-2 text-muted-foreground">
                        {description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem> */}

          {/* <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link href={href} className="text-base px-2">
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex">
        <ModeToggle />

        <Button asChild size="sm" variant="ghost" aria-label="View on GitHub">
          <Link
            aria-label="View on GitHub"
            href="https://github.com/diegopluna/vitaes.git"
            target="_blank"
          >
            <GitHubLogoIcon className="size-5" />
          </Link>
        </Button>
        <UserButton user={user} />
      </div>
    </header>
  )
}
