import React, { FC, useEffect, useState } from 'react'
import TourNameInput from '../TourNameInput'
import GuestsInput from '../GuestsInput'
import ExperiencesDateSingleInput from './ExperiencesDateSingleInput'
import { useSearchParams } from 'next/navigation'

const ExperiencesSearchForm: FC = () => {
  const searchParams = useSearchParams()
  const searchText = searchParams.get('searchText') || undefined
  const [searchTextValue, setSearchTextValue] = useState('')

  useEffect(() => {
    setSearchTextValue(searchText || '')
  }, [searchText])

  const renderForm = () => {
    return (
      <form className="w-full relative lg:mt-8 flex flex-col md:flex-row rounded-3xl md:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ">
        <TourNameInput
          className="flex-[1.5]"
          value={searchTextValue}
          setValue={setSearchTextValue}
        />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-5 md:h-8"></div>
        <ExperiencesDateSingleInput className="flex-1" />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-5 md:h-8"></div>
        <GuestsInput
          className="flex-1"
          searchTextValue={searchTextValue}
          hasButtonSubmit
        />
      </form>
    )
  }

  return renderForm()
}

export default ExperiencesSearchForm
