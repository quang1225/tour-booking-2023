import React, { FC } from 'react'
import Badge from '@/shared/Badge'
import Link from 'next/link'
import GallerySlider from './GallerySlider'
import { Order } from '@/queries/types'
import { Route } from 'next'

export interface OrderCardProps {
  className?: string
  data?: Order
  size?: 'default' | 'small'
}

const OrderCard: FC<OrderCardProps> = ({
  size = 'default',
  className = '',
  data,
}) => {
  const {
    id,
    status,
    startDate,
    tour,
    adultPrice = 0,
    childPrice = 0,
    infantPrice = 0,
    numberOfAdults = 0,
    numberOfChilds = 0,
    numberOfInfants = 0,
  } = data || {}

  const totalPrice =
    adultPrice * numberOfAdults +
    childPrice * numberOfChilds +
    infantPrice * numberOfInfants
  const totalGuests = numberOfAdults + numberOfChilds + numberOfInfants

  const { name, duration, galleryImgs } = tour || {}

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard_${id}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          galleryImgs={galleryImgs?.split(',') || []}
          href={`/bookings/${id}` as Route}
          galleryClass={size === 'default' ? undefined : ''}
        />
        <Badge
          name={status}
          color={status === 'PAID' ? 'green' : 'yellow'}
          className="absolute left-3 top-3"
        />
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div className={size === 'default' ? 'p-4 space-y-4' : 'p-3 space-y-1'}>
        <div className={size === 'default' ? 'space-y-2' : 'space-y-1'}>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {startDate
              ? new Date(startDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                })
              : ''}
          </span>
          <div className="flex items-center space-x-2">
            <h2
              className={`font-semibold capitalize text-neutral-900 dark:text-white ${
                size === 'default' ? 'text-base' : 'text-base'
              }`}
            >
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
            <span className="">{duration}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">${totalPrice}</span>
          <span>{totalGuests} guests</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 ${
        size === 'default'
          ? 'border border-neutral-100 dark:border-neutral-800 '
          : ''
      } rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="StayCard"
    >
      {renderSliderGallery()}
      <Link href={`/bookings/${id}` as Route}>{renderContent()}</Link>
    </div>
  )
}

export default OrderCard
