import React, { FC } from 'react'
import GallerySlider from '@/components/GallerySlider'
// import StartRating from "@/components/StartRating";
// import SaleOffBadge from "@/components/SaleOffBadge";
// import Badge from "@/shared/Badge";
import Link from 'next/link'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { Tour } from '@/__generated__/graphql'
import { Route } from 'next'
import LikeShareBtns from './LikeShareBtns'
import { getTourDetailLink } from '@/utils'

export interface TourCardProps {
  className?: string
  onSaveSuccess?: () => void
  ratioClass?: string
  data?: Tour
  size?: 'default' | 'small'
}

const TourCard: FC<TourCardProps> = ({
  size = 'default',
  onSaveSuccess,
  className = '',
  data,
  ratioClass = 'aspect-w-3 aspect-h-3',
}) => {
  const {
    id,
    name,
    adultPrice,
    featuredImage = '',
    galleryImgs,
    duration,
    categories = [],
  } = data || {}

  const sliderImgs = [featuredImage, ...(galleryImgs?.split(',') || [])]

  if (!id) return <></>

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden ">
        <GallerySlider
          uniqueID={`TourCard_${id}`}
          ratioClass={ratioClass}
          galleryImgs={sliderImgs}
          href={getTourDetailLink({ id, name })}
        />

        <LikeShareBtns isCard tourId={id} onSaveSuccess={onSaveSuccess} />
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div className={size === 'default' ? 'py-4 space-y-3' : 'p-3 space-y-1'}>
        <div className="space-y-2">
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            {size === 'default' && <MapPinIcon className="w-4 h-4" />}
            <span className="">
              {categories?.map((category) => category.name)?.join(' | ')}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* {isAds && <Badge name="ADS" color="green" />} */}
            <h2
              className={` font-medium capitalize ${
                size === 'default' ? 'text-base' : 'text-base'
              }`}
            >
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>
        </div>
        <div className="border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {adultPrice}${` `}
            {size === 'default' && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /person
              </span>
            )}
          </span>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1">
            <i className="las la-clock text-base"></i>
            <span>{duration}</span>
          </div>
          {/* <StartRating reviewCount={reviewCount} point={reviewStart} /> */}
        </div>
      </div>
    )
  }

  return (
    <div className={`nc-TourCard group relative ${className}`}>
      {renderSliderGallery()}
      <Link href={getTourDetailLink({ id, name })}>{renderContent()}</Link>
    </div>
  )
}

export default TourCard
