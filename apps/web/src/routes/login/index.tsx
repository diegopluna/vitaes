import { m } from '@/paraglide/messages'
import { AuthView } from '@daveyplate/better-auth-ui'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="container mx-auto flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
      <AuthView
        view="SIGN_IN"
        socialLayout="vertical"
        localization={{
          SIGN_IN: m['login.title'](),
          DISABLED_CREDENTIALS_DESCRIPTION: m['login.description'](),
          SIGN_IN_WITH: m['login.signInWith'](),
        }}
        redirectTo="/dashboard"
      />
    </main>
  )
}
