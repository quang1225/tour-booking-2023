'use client'

import TourCard from '@/components/TourCard'
import React from 'react'
// import ButtonSecondary from "@/shared/ButtonSecondary";
import useGetSavedList from '@/hooks/api/user/useGetSavedList'
import CommonSpinner from '@/components/common/CommonSpinner'
import { Tour } from '@/queries/types'

const AccountSavelists = () => {
  const { savedListData, loadingGetSavedList, getSavedList } = useGetSavedList()
  const tours = (savedListData?.data || []) as Tour[]

  const onSaveSuccess = () => {
    getSavedList()
  }

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Saved list</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {loadingGetSavedList && (
          <div className="mt-16">
            <CommonSpinner />
          </div>
        )}

        {!loadingGetSavedList && (
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tours?.map((tour) => (
              <TourCard
                key={tour.id}
                data={tour as Tour}
                onSaveSuccess={onSaveSuccess}
              />
            ))}
          </div>
        )}

        {!loadingGetSavedList && !tours.length && (
          <div className="flex justify-center">No saved tour</div>
        )}

        {/* <div className="flex mt-11 justify-center items-center">
          <ButtonSecondary>Show me more</ButtonSecondary>
        </div> */}
      </div>
    )
  }

  return renderSection1()
}

export default AccountSavelists
