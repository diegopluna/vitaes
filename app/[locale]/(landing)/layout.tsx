import * as React from 'react'
import { Navbar } from './_components/navbar'

type Props = {
  children: React.ReactNode
}

export default function LandingLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
