'use client'

import React, { FC, useEffect } from 'react'
import { Squares2X2Icon } from '@heroicons/react/24/outline'
import Badge from '@/shared/Badge'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import LikeShareBtns from '@/components/LikeShareBtns'
import Image from 'next/image'
import StayDatesRangeInput from './StayDatesRangeInput'
import { Route } from 'next'
import Link from 'next/link'
import CommonSpinner from '@/components/common/CommonSpinner'
import ListingImageGallery from '@/components/listing-image-gallery/ListingImageGallery'
import { ListingGalleryImage } from '@/components/listing-image-gallery/utils/types'
import GuestsInput from '@/app/(client-components)/(HeroSearchForm)/GuestsInput'
import { useAppContext } from '@/contexts/app'
import MobileFooterSticky from '../(components)/MobileFooterSticky'
import ModalReserveMobile from '../(components)/ModalReserveMobile'
import useGetTourDetail from '@/hooks/api/tour/useGetTourDetail'
import TourPriceDetail from '@/app/(client-components)/TourPriceDetail'
import { Tour } from '@/queries/types'
import { useLocation } from 'react-use'

interface Props {
  tourId: number
}

const ListingExperiencesDetailPage: FC<Props> = ({ tourId }) => {
  const location = useLocation()
  const router = useRouter()
  const { userInfo } = useAppContext()
  const searchParams = useSearchParams()
  const isShowGallery = searchParams?.get('showGallery')
  const pathname = usePathname()

  const { tourDetailData, loadingGetTourDetail, getTourDetail } =
    useGetTourDetail(tourId)

  const tourDetail = tourDetailData?.data as Tour
  const {
    id,
    name = '',
    categories = [],
    duration = '',
    description = '',
    adultPrice = 0,
    featuredImage = '',
    galleryImgs = '',
  } = tourDetail || {}

  useEffect(() => {
    if (!loadingGetTourDetail && !id) {
      router.replace('/')
    }
  }, [loadingGetTourDetail, id])

  if (loadingGetTourDetail)
    return (
      <div className="mt-36 md:mt-16">
        <CommonSpinner />
      </div>
    )

  const handleOpenModalImageGallery = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('showGallery', '1')
    router.push(`${pathname}/?${params.toString()}` as Route)
  }

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <i className="las la-clock text-2xl"></i>
            <span className="">{duration}</span>
          </div>
          <LikeShareBtns tourId={id} />
        </div>

        {/* 2 */}
        <h2 className="text-2xl lg:text-3xl font-semibold">{name}</h2>

        {/* 3 */}
        <div className="flex items-center gap-4">
          <i className="las la-map-marker-alt text-2xl -mr-2"></i>
          {categories?.map((item) => (
            <Link key={item.id} href={`/tours?categories=${item.id}`}>
              <Badge color="blue" name={item.name} />
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Tour descriptions</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <div dangerouslySetInnerHTML={{ __html: description || '' }} />
        </div>
      </div>
    )
  }

  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            ${adultPrice}
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /person
            </span>
          </span>
          {/* <StartRating /> */}
        </div>

        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          <StayDatesRangeInput className="flex-1 z-[11]" />
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <GuestsInput className="flex-1" />
        </form>

        {/* SUM */}
        <TourPriceDetail tourDetail={tourDetail} />

        <ModalReserveMobile
          tourDetail={tourDetail}
          onClose={getTourDetail}
          renderChildren={({ openModal }) => (
            <ButtonPrimary
              sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
              onClick={() => {
                if (!userInfo.email) {
                  router.push(
                    `/login?redirect=${encodeURIComponent(
                      `${location.pathname}${location.search}`
                    )}`
                  )
                  return
                }

                openModal()
              }}
            >
              {userInfo.email ? 'Reserve' : 'Login to reserve'}
            </ButtonPrimary>
          )}
        />
      </div>
    )
  }

  const handleCloseModalImageGallery = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('showGallery')
    router.push(`${pathname}/?${params.toString()}` as Route)
  }

  return (
    <div className={`nc-ListingExperiencesDetailPage`}>
      <ListingImageGallery
        tourId={id}
        isShowModal={!!isShowGallery}
        onClose={handleCloseModalImageGallery}
        images={galleryImgs.split(',').map(
          (url, index) =>
            ({
              id: index,
              url,
            }) as ListingGalleryImage
        )}
      />

      {/* SINGLE HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
          <div
            className="col-span-3 row-span-3 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
            onClick={handleOpenModalImageGallery}
          >
            <Image
              alt="featured image"
              fill
              className="object-cover rounded-md sm:rounded-xl"
              src={featuredImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
          {galleryImgs
            ?.split(',')
            .slice(0, 3)
            .map((item, index) => (
              <div
                key={index}
                className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                  index >= 2 ? 'block' : ''
                }`}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    alt="photos"
                    fill
                    className="object-cover w-full h-full rounded-md sm:rounded-xl "
                    src={item || ''}
                    sizes="400px"
                  />
                </div>

                {/* OVERLAY */}
                <div
                  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handleOpenModalImageGallery}
                />
              </div>
            ))}

          <div
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="h-5 w-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
          </div>
        </div>
      </header>

      {/* MAIn */}
      <main className="relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderSection1()}
          {renderSection2()}
          {/* {renderSection3()} */}
          {/* {renderSection7()} */}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
      </main>

      <MobileFooterSticky tourDetail={tourDetail} onClose={getTourDetail} />
    </div>
  )
}

export default ListingExperiencesDetailPage
