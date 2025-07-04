'use client'

import React, { FC, useEffect } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Link from 'next/link'
import BookingTourCard from '../../(client-components)/BookingTourCard'
import useUserGetOrderDetail from '@/hooks/api/user/useGetOrderDetail'
import { Order } from '@/queries/types'
import { useRouter } from 'next/navigation'
import Badge from '@/shared/Badge'
import ButtonSecondary from '@/shared/ButtonSecondary'
import TourPriceDetail from '@/app/(client-components)/TourPriceDetail'
import NcModal from '@/shared/NcModal'
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline'

interface Props {
  params: { orderId: string }
}

const UserOrderDetail: FC<Props> = ({ params }) => {
  const router = useRouter()

  const orderId = params.orderId
  const { orderDetailData, loadingGetOrderDetail } =
    useUserGetOrderDetail(orderId)

  const orderDetail = orderDetailData?.data as Order
  const {
    tour: tourDetail,
    id,
    status,
    startDate,
    createdAt,
    adultPrice = 0,
    childPrice = 0,
    infantPrice = 0,
    numberOfAdults = 0,
    numberOfChilds = 0,
    numberOfInfants = 0,
    paymentMethod,
    otherRequest,
  } = orderDetail || {}

  const totalPrice =
    adultPrice * numberOfAdults +
    childPrice * numberOfChilds +
    infantPrice * numberOfInfants

  useEffect(() => {
    if (!loadingGetOrderDetail && !id) {
      router.replace('/')
    }
  }, [loadingGetOrderDetail, id])

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <BookingTourCard tourDetail={tourDetail} />

        <TourPriceDetail tourDetail={tourDetail} isCheckout />
      </div>
    )
  }

  const renderMain = () => {
    return (
      <>
        <div className="w-full flex flex-col gap-10">
          <div className="flex items-center justify-between lg:hidden mt-2">
            <div>
              <h3 className="text-2xl font-semibold">Total</h3>
              <NcModal
                renderTrigger={(openModal) => (
                  <span
                    onClick={() => openModal()}
                    className="underline  mt-1 cursor-pointer"
                  >
                    View price details
                  </span>
                )}
                renderContent={renderSidebar}
                modalTitle="Price details"
              />
            </div>
            <h3 className="text-3xl mr-3 font-semibold">${totalPrice}</h3>
          </div>

          <div className=" border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-row divide-x divide-neutral-200 dark:divide-neutral-700">
            <div className="flex-1 p-5 flex space-x-4">
              <svg
                className="w-7 h-7 text-neutral-300 dark:text-neutral-6000"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.33333 8.16667V3.5M18.6667 8.16667V3.5M8.16667 12.8333H19.8333M5.83333 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V8.16667C24.5 6.878 23.4553 5.83333 22.1667 5.83333H5.83333C4.54467 5.83333 3.5 6.878 3.5 8.16667V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5Z"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Start date</span>
                <span className="mt-1.5 text-lg font-semibold">
                  {startDate
                    ? new Date(startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: '2-digit',
                      })
                    : ''}
                </span>
              </div>
            </div>
            <div className="flex-1 p-5 flex space-x-4">
              <svg
                className="w-7 h-7 text-neutral-300 dark:text-neutral-6000"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5.07987C14.8551 4.11105 16.1062 3.5 17.5 3.5C20.0773 3.5 22.1667 5.58934 22.1667 8.16667C22.1667 10.744 20.0773 12.8333 17.5 12.8333C16.1062 12.8333 14.8551 12.2223 14 11.2535M17.5 24.5H3.5V23.3333C3.5 19.4673 6.63401 16.3333 10.5 16.3333C14.366 16.3333 17.5 19.4673 17.5 23.3333V24.5ZM17.5 24.5H24.5V23.3333C24.5 19.4673 21.366 16.3333 17.5 16.3333C16.225 16.3333 15.0296 16.6742 14 17.2698M15.1667 8.16667C15.1667 10.744 13.0773 12.8333 10.5 12.8333C7.92267 12.8333 5.83333 10.744 5.83333 8.16667C5.83333 5.58934 7.92267 3.5 10.5 3.5C13.0773 3.5 15.1667 5.58934 15.1667 8.16667Z"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Guests</span>
                <span className="mt-1.5 text-lg font-semibold">3 Guests</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Booking detail</h3>
            <div className="flex flex-col space-y-6">
              <div className="flex text-neutral-6000 dark:text-neutral-300">
                <span className="flex-1">Booking code</span>
                <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                  {id}
                </span>
              </div>
              <div className="flex text-neutral-6000 dark:text-neutral-300">
                <span className="flex-1">Status</span>
                <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100 gap-2">
                  <Badge
                    name={status}
                    color={status === 'PAID' ? 'green' : 'yellow'}
                    size="medium"
                  />
                </span>
              </div>
              <div className="flex text-neutral-6000 dark:text-neutral-300">
                <span className="flex-1">Created at</span>
                <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100 gap-2">
                  {createdAt
                    ? new Date(createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''}{' '}
                  {createdAt
                    ? new Date(createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                      })
                    : ''}
                </span>
              </div>
              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span className="flex-1">Payment method</span>
                <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100 capitalize">
                  {paymentMethod}
                </span>
              </div>
              <div className="flex text-neutral-6000 dark:text-neutral-300">
                <span className="flex-1">Other requests</span>
                <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                  {otherRequest}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex gap-8 flex-row items-center justify-center">
          <Link href="/account/bookings">
            <ButtonSecondary>
              <ArrowSmallLeftIcon className="h-6 w-6 mr-3" /> My bookings
            </ButtonSecondary>
          </Link>

          <Link href="/tours">
            <ButtonPrimary>Explore more tours</ButtonPrimary>
          </Link>
        </div>
      </>
    )
  }

  return (
    <div className={`nc-CheckOutPagePageMain`}>
      <main className="container mt-7 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  )
}

export default UserOrderDetail
