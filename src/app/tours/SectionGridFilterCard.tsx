'use client'

import React, { FC } from 'react'
import Pagination from '@/shared/Pagination'
import TourCard from '@/components/TourCard'
import CommonSpinner from '@/components/common/CommonSpinner'
import { Tour } from '@/queries/types'
import TabFilters from './TabFilters'
import useGetTours, {
  SortValues,
  TOURS_PAGE_SIZE,
} from '@/hooks/api/tour/useGetTours'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Route } from 'next'

export interface SectionGridFilterCardProps {
  className?: string
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = '',
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchText = searchParams.get('searchText') || undefined
  const filteredCategories =
    searchParams
      .get('categories')
      ?.split(',')
      .map((x) => Number(x)) || undefined
  const minPrice = Number(searchParams.get('minPrice')) || undefined
  const maxPrice = Number(searchParams.get('maxPrice')) || undefined
  const sort = (searchParams.get('sort') || 'newest') as SortValues
  const currentPage = Number(searchParams.get('page')) || 1

  const onPageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())

    if (pageNumber < 2) {
      params.delete('page')
    } else {
      params.set('page', `${pageNumber}`)
    }

    router.push(`${pathname}?${params.toString()}` as Route, { scroll: false })
  }

  const { tours, loadingGetTours, totalTours } = useGetTours({
    searchText,
    categories: filteredCategories,
    minPrice,
    maxPrice,
    sort,
    currentPage,
  })

  return (
    <div className={`nc-SectionGridFilterCard ${className}`}>
      <div className={`mb-12 lg:mb-16`}>
        <h2 className="text-3xl font-semibold">All tours</h2>
        <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
          {totalTours} tours
        </span>
      </div>

      <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div>

      {loadingGetTours && (
        <div className="mt-16">
          <CommonSpinner />
        </div>
      )}

      {!loadingGetTours && tours.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {tours?.map((tour) => (
              <TourCard key={tour.id} data={tour as Tour} />
            ))}
          </div>
          <div className="flex mt-16 justify-center items-center">
            <Pagination
              currentPage={currentPage}
              onPageChange={onPageChange}
              totalItems={totalTours}
              pageSize={TOURS_PAGE_SIZE}
            />
          </div>
        </>
      )}

      {!loadingGetTours && !tours.length && (
        <div className="flex justify-center">No result</div>
      )}
    </div>
  )
}

export default SectionGridFilterCard
