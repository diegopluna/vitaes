import { Navbar } from './_components/navbar'

export default function GatewayLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
