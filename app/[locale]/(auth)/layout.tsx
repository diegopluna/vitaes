import { AuthStateProvider } from '@/providers/auth-state-provider'

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return <AuthStateProvider>{children}</AuthStateProvider>
}
