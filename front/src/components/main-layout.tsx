import { Outlet } from '@tanstack/react-router'
import { Header } from './header/header'
import { Footer } from './footer/footer'

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
