'use client'

import { PencilSquareIcon } from '@heroicons/react/24/outline'
import React, { FC, useState } from 'react'
import NcModal from '@/shared/NcModal'
import ModalSelectDate from '@/components/ModalSelectDate'
import ModalSelectGuests from '@/components/ModalSelectGuests'
import { useAppContext } from '@/contexts/app'
import { Tour } from '@/queries/types'
import TourPriceDetail from '../(client-components)/TourPriceDetail'
import BookingTourCard from '../(client-components)/BookingTourCard'
import CommonPaypalButton from './CommonPaypalButton'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Textarea from '@/shared/Textarea'
import Label from '@/components/Label'

export interface CheckOutPagePageMainProps {
  className?: string
  tourDetail: Tour | undefined
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = '',
  tourDetail,
}) => {
  const { userInput, setUserInput } = useAppContext()

  const {
    startDate = new Date(),
    numberOfAdults = 0,
    numberOfChilds = 0,
    numberOfInfants = 0,
    otherRequest,
  } = userInput
  const startDateStr =
    startDate?.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    }) || 'Start date'

  const totalGuests = numberOfAdults + numberOfChilds + numberOfInfants

  const {
    id,
    adultPrice = 0,
    childPrice = 0,
    infantPrice = 0,
  } = tourDetail || {}

  if (!id) return <></>

  const totalPrice =
    adultPrice * numberOfAdults +
    childPrice * numberOfChilds +
    infantPrice * numberOfInfants

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
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-7 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Confirm and payment
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div className="flex items-center justify-between lg:hidden">
            <div>
              <h3 className="text-2xl font-semibold">Total</h3>
              <NcModal
                renderTrigger={(openModal) => (
                  <span
                    onClick={() => openModal()}
                    className="underline  mt-1 cursor-pointer"
                  >
                    View booking details
                  </span>
                )}
                renderContent={renderSidebar}
                modalTitle="Booking details"
              />
            </div>
            <h3 className="text-3xl mr-3 font-semibold">${totalPrice}</h3>
          </div>

          <div className="mt-6 lg:mt-0 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden z-10">
            <ModalSelectDate
              renderChildren={({ openModal }) => (
                <button
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Start date</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      {/* {converSelectedDateToString([startDate, endDate])} */}
                      {startDateStr}
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />

            <ModalSelectGuests
              renderChildren={({ openModal }) => (
                <button
                  type="button"
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Guests</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      <span className="line-clamp-1">{totalGuests} Guests</span>
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />
          </div>
        </div>

        {/* <div>
          <h3 className="text-2xl font-semibold">Pay with</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-6">
            <Tab.Group>
              <Tab.List className="flex my-5 gap-1">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                          : "text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      Paypal
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                          : " text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <span className="mr-2.5">Credit card</span>
                      <Image className="w-8" src={visaPng} alt="visa" />
                      <Image className="w-8" src={mastercardPng} alt="mastercard" />
                    </button>
                  )}
                </Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Card number </Label>
                    <Input defaultValue="111 112 222 999" />
                  </div>
                  <div className="space-y-1">
                    <Label>Card holder </Label>
                    <Input defaultValue="JOHN DOE" />
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Expiration date </Label>
                      <Input type="date" defaultValue="MM/YY" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>CVC </Label>
                      <Input />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">Write a few sentences about yourself.</span>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Email </Label>
                    <Input type="email" defaultValue="example@gmail.com" />
                  </div>
                  <div className="space-y-1">
                    <Label>Password </Label>
                    <Input type="password" defaultValue="***" />
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">Write a few sentences about yourself.</span>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            <ButtonPrimary className="mt-8" onClick={checkkout} loading={loadingCheckout}>
              Confirm and pay
            </ButtonPrimary>
          </div>
        </div> */}

        {/* <ButtonPrimary className="mt-8" onClick={onClickCheckout} loading={loadingCheckout}>
          Confirm and pay
        </ButtonPrimary> */}

        <div className="space-y-1">
          <Label>Other requests</Label>
          <Textarea
            onChange={(e) => setUserInput({ otherRequest: e.target.value })}
            value={otherRequest}
          />
          <span className="text-sm text-neutral-500 block">
            Write a specific request for the reservation
          </span>
        </div>

        <PayPalScriptProvider
          deferLoading={true}
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
            currency: 'USD',
          }}
        >
          <CommonPaypalButton
            tourDetail={tourDetail}
            otherRequest={otherRequest}
          />
        </PayPalScriptProvider>
      </div>
    )
  }

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-7 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  )
}

export default CheckOutPagePageMain
