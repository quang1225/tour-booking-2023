import React, { FC } from 'react'
import SectionGridFilterCard from './SectionGridFilterCard'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import HeroSearchForm from '@/app/(client-components)/(HeroSearchForm)/HeroSearchForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All tours - Best Travel Experience',
  description: `Accompanying us, you have a trip full of experiences. Let's checkout Beautiful Places Arround the World.`,
}

const ListingExperiencesPage: FC = () => {
  return (
    <div className={`nc-ListingStayPage relative `}>
      <BgGlassmorphism />

      <div className="container pb-6 lg:pt-8 lg:pb-20">
        <HeroSearchForm />
      </div>

      <div className="container relative">
        <SectionGridFilterCard className="pb-24 lg:pb-28" />
      </div>
    </div>
  )
}

export default ListingExperiencesPage
