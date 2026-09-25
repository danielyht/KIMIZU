import { MotionConfig } from 'framer-motion'
import { useEffect } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { NightSky } from '../components/NightSky'
import { WaterDivider } from '../components/WaterDivider'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Hero } from '../sections/Hero'
import { Highlights } from '../sections/Highlights'
import { Products } from '../sections/Products'
import { Testimonials } from '../sections/Testimonials'

/** Vitrine pública da Kimizu. */
export function StorefrontPage() {
  useEffect(() => {
    if (!window.location.hash) return
    const target = document.querySelector(window.location.hash)
    target?.scrollIntoView({ block: 'start' })
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <NightSky />
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Products />
        <WaterDivider />
        <About />
        <Testimonials />
        <WaterDivider flip />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
