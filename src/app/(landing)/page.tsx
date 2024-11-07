import { Footer } from './_components/sections/footer'
import { Benefits } from './_components/sections/benefits'
import { Features } from './_components/sections/features'
import { Hero } from './_components/sections/hero'
import { Services } from './_components/sections/services'
import { Sponsors } from './_components/sections/sponsors'
import { Testimonial } from './_components/sections/testimonial'

export default function Home() {
  return (
    <>
      <Hero />
      <Sponsors />
      <Benefits />
      <Features />
      <Services />
      <Testimonial />
      <Footer />
    </>
  )
}
