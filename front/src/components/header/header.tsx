import Logo from '@/assets/images/logo.svg'
import { Link } from '@tanstack/react-router'
import { ModeToggle } from '../mode-toggle'
import TypingAnimation from '../ui/typing-animation'

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="ml-4 mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <img src={Logo} alt="Vitaes" width={24} height={24} />
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
