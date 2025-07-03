import React from 'react'
import SectionHero from '@/app/(server-components)/SectionHero'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import SectionOurFeatures from '@/components/SectionOurFeatures'
import SectionHowItWork from '@/components/SectionHowItWork'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_ORIGIN}`),
  title: 'MIA Tour - Best Travel Experience',
  description: `Accompanying us, you have a trip full of experiences. Let's checkout Beautiful Places Arround the World.`,
  openGraph: {
    images: ['/MIA-Tour.png'],
  },
}

function PageHome() {
  return (
    <main className="nc-PageHome relative overflow-hidden">
      <BgGlassmorphism className="md:top-10 xl:top-40 pl-20 py-24" />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <SectionHero className="pt-10 lg:pt-16 lg:pb-16" />

        <SectionOurFeatures />

        <SectionHowItWork />
      </div>
    </main>
  )
}

export default PageHome
