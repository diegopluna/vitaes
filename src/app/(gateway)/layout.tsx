import { GatewayFooter } from './_components/gateway-footer'
import { GatewayHeader } from './_components/gateway-header'

export default function GatewayLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <GatewayHeader />
      {children}
      <GatewayFooter />
    </>
  )
}
