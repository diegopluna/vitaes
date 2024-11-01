import Image from 'next/image'
import { ModeToggle } from '@/components/mode-toggle'
import TypingAnimation from '@/components/ui/typing-animation'
import Link from 'next/link'

export const GatewayHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex-1 flex h-14 items-center">
        <div className="ml-4 mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/vitaes.svg" alt="Vitaes" width={24} height={24} />
            <TypingAnimation
              className="hidden text-md sm:inline-block"
              text="Vitaes"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end px-4">
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
