import { Hero } from '@/components/Hero'
import { SectionDivider } from '@/components/SectionDivider'
import { ScrollProgress } from '@/components/ScrollProgress'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Education } from '@/components/Education'
import { Services } from '@/components/Services'
import { Process } from '@/components/Process'
import { FAQ } from '@/components/FAQ'
import { CTABanner } from '@/components/CTABanner'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { BackToTop } from '@/components/BackToTop'

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Hero />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Education />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <FAQ />
      <SectionDivider />
      <CTABanner />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  )
}
