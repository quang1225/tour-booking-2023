'use client'

import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useState, useRef, FC, useEffect } from 'react'
import CommonSpinner from '@/components/common/CommonSpinner'
import { useRouter } from 'next/navigation'
import { Category } from '@/queries/types'
import useGetCategories from '@/hooks/api/tour/useGetCategories'

interface Props {
  closeModal?: () => void
  onClick?: () => void
  onChange?: (value: string) => void
  className?: string
  defaultValue?: string
  headingText?: string
}

const LocationInput: FC<Props> = ({
  closeModal,
  onChange,
  className = '',
  defaultValue = '',
  headingText = 'Where to?',
}) => {
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  const { categories, loadingGetCategories } = useGetCategories()

  const handleSelectCategory = (categoryId: number) => {
    router.push(`/tours?categories=${categoryId}`)
    closeModal?.()
  }

  useEffect(() => {
    onChange?.(value)
  }, [value])

  const renderSearchValues = ({
    heading,
    items,
  }: {
    heading: string
    items: Category[]
  }) => {
    return (
      <>
        <p className="block font-semibold text-base">
          {heading || 'Destinations'}
        </p>
        <div className="mt-3">
          {items.map((item) => {
            return (
              <div
                className="py-2 mb-1 flex items-center space-x-3 text-sm"
                onClick={() => handleSelectCategory(item.id)}
                key={item.id}
              >
                <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <span className="">{item.name}</span>
              </div>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <div className={`${className}`} ref={containerRef}>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {headingText}
        </span>
        <div className="relative mt-5">
          <input
            className={`block w-full bg-transparent border px-4 py-3 pr-12 border-neutral-900 dark:border-neutral-200 rounded-xl focus:ring-0 focus:outline-none text-base leading-none placeholder-neutral-500 dark:placeholder-neutral-300 truncate font-bold placeholder:truncate`}
            placeholder={'Search destinations'}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            ref={inputRef}
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <MagnifyingGlassIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-400" />
          </span>
        </div>
        <div className="mt-7">
          {loadingGetCategories && <CommonSpinner />}

          {!loadingGetCategories &&
            renderSearchValues({
              heading: 'Categories',
              items: categories,
            })}
        </div>
      </div>
    </div>
  )
}

export default LocationInput
