import { m } from '@/paraglide/messages'
import { AuthView } from '@daveyplate/better-auth-ui'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ModeToggle } from '@/components/mode-toggle'
import { LanguageSelector } from '@/components/language-selector'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)]" />

      <header className="relative z-10 border-b bg-background/95 backdrop-blur">
        <div className=" flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80">
            <img src="/logo.svg" alt="Vitaes" className="h-6 w-6" />
            <span className="text-lg font-semibold">Vitaes</span>
          </Link>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-6 text-center">
          <AuthView
            view="SIGN_IN"
            socialLayout="vertical"
            localization={{
              SIGN_IN: m['login.title'](),
              DISABLED_CREDENTIALS_DESCRIPTION: m['login.description'](),
              SIGN_IN_WITH: m['login.signInWith'](),
            }}
            redirectTo={`${import.meta.env.VITE_APP_URL}/dashboard`}
          />
        </div>
      </main>
    </div>
  )
}
