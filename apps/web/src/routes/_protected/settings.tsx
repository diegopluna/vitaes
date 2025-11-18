import { m } from '@/paraglide/messages'
import {
  DeleteAccountCard,
  ProvidersCard,
  SessionsCard,
  UpdateNameCard,
} from '@daveyplate/better-auth-ui'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ModeToggle } from '@/components/mode-toggle'
import { LanguageSelector } from '@/components/language-selector'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/_protected/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="relative mx-auto flex max-w-4xl flex-col gap-8 px-8 py-10">
        <Link
          to="/dashboard"
          className="fixed left-4 top-4 z-20 inline-flex items-center gap-2 rounded border border-white/15 bg-background/80 px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {m['navigation.backToDashboard']()}
        </Link>
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              {m['settings.hero.title']()}
            </p>
            <p className="text-sm text-muted-foreground">
              {m['settings.hero.subtitle']()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <LanguageSelector />
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="border border-white/10 bg-card/80 p-6 shadow-lg backdrop-blur">
            <UpdateNameCard
              localization={{
                NAME: m['settings.name.label'](),
                NAME_DESCRIPTION: m['settings.name.description'](),
                NAME_PLACEHOLDER: m['settings.name.placeholder'](),
                NAME_INSTRUCTIONS: m['settings.name.instructions'](),
                SAVE: m['settings.name.saveChanges'](),
              }}
            />
          </div>

          <div className="border border-white/10 bg-card/80 p-6 shadow-lg backdrop-blur">
            <ProvidersCard
              localization={{
                PROVIDERS: m['settings.providers.label'](),
                PROVIDERS_DESCRIPTION: m['settings.providers.description'](),
                LINK: m['settings.providers.link'](),
                UNLINK: m['settings.providers.unlink'](),
              }}
            />
          </div>

          <div className="border border-white/10 bg-card/80 p-6 shadow-lg backdrop-blur md:col-span-2">
            <SessionsCard
              localization={{
                SESSIONS: m['settings.sessions.label'](),
                SESSIONS_DESCRIPTION: m['settings.sessions.description'](),
                CURRENT_SESSION: m['settings.sessions.currentSession'](),
                SIGN_OUT: m['settings.sessions.signOut'](),
                REVOKE: m['settings.sessions.revoke'](),
              }}
            />
          </div>

          <div className="border border-white/10 bg-card/90 p-6 shadow-lg shadow-red-500/10 backdrop-blur md:col-span-2">
            <DeleteAccountCard
              localization={{
                DELETE_ACCOUNT: m['settings.deleteAccount.label'](),
                DELETE_ACCOUNT_DESCRIPTION:
                  m['settings.deleteAccount.description'](),
                DELETE: m['settings.deleteAccount.button'](),
                DELETE_ACCOUNT_INSTRUCTIONS:
                  m['settings.deleteAccount.instructions'](),
                CANCEL: m['settings.deleteAccount.cancel'](),
              }}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
