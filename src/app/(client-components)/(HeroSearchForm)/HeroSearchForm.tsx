'use client'

import React, { FC } from 'react'
import ExperiencesSearchForm from './(experiences-search-form)/ExperiencesSearchForm'

const HeroSearchForm: FC = () => {
  return (
    <div className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0`}>
      <ExperiencesSearchForm />
    </div>
  )
}

export default HeroSearchForm
