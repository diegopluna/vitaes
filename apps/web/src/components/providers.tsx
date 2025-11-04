import { authClient } from '@/lib/auth-client'
import { AuthQueryProvider } from '@daveyplate/better-auth-tanstack'
import { AuthUIProviderTanstack } from '@daveyplate/better-auth-ui/tanstack'
import { Link, useRouter } from '@tanstack/react-router'

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <AuthQueryProvider>
      <AuthUIProviderTanstack
        signUp={false}
        authClient={authClient}
        credentials={false}
        social={{ providers: ['google', 'github'] }}
        account={{
          basePath: '/',
        }}
        navigate={(href) => router.navigate({ href })}
        replace={(href) => router.navigate({ href, replace: true })}
        Link={({ href, ...props }) => <Link to={href} {...props} />}
      >
        {children}
      </AuthUIProviderTanstack>
    </AuthQueryProvider>
  )
}
