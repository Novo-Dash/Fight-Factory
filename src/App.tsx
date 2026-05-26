import { ModalContext, useModalState } from './hooks/useModal'
import { useUTMs } from './hooks/useUTMs'
import { useScrollDepth } from './hooks/useScrollDepth'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/sections/Footer'
import {
  Hero,
  WhyBeginners,
  Programs,
  Coach,
  Process,
  Gallery,
  Testimonials,
  Facility,
  FAQ,
} from './components/sections'
import { LeadModal } from './components/ui/LeadModal'
import { Marquee } from './components/ui/Marquee'

export default function App() {
  const modal = useModalState()
  useUTMs()
  useScrollDepth()

  return (
    <ModalContext.Provider value={modal}>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <WhyBeginners />
        <Programs />
        <Process />
        <Gallery />
        <Coach />
        <Testimonials />
        <Facility />
        <FAQ />
      </main>
      <Footer />
      <LeadModal />
    </ModalContext.Provider>
  )
}
