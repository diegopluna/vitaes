import { AuthStateProvider } from '@/providers/auth-state-provider'

export default function GatewayLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AuthStateProvider>{children}</AuthStateProvider>
}
