import Features from "@/components/Features"
import Footer from "@/components/Footer"
import JobOpenings from "@/components/JobOpenings"
import Pricing from "@/components/Pricing"
import { SiteHero } from "@/components/site-hero"
import { SiteNavbar } from "@/components/site-navbar"

export default function Page() {
  return (
    <main>
      <SiteNavbar />
      <SiteHero />
      <JobOpenings />
      <Features />
      <Pricing />
      <Footer />
    </main>
  )
}
