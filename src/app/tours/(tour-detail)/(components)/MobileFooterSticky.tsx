import React, { FC, useEffect, useRef } from 'react'
import ModalSelectDate from '@/components/ModalSelectDate'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ModalReserveMobile from './ModalReserveMobile'
import { useAppContext } from '@/contexts/app'
import { Tour } from '@/queries/types'
import { useRouter } from 'next/navigation'
import { useLocation } from 'react-use'

interface MobileFooterStickyProps {
  tourDetail: Tour | undefined
  onClose?: () => void
}

const MobileFooterSticky: FC<MobileFooterStickyProps> = ({
  tourDetail,
  onClose,
}) => {
  const location = useLocation()
  const router = useRouter()
  const { userInput, userInfo } = useAppContext()

  const {
    startDate,
    numberOfAdults = 0,
    numberOfChilds = 0,
    numberOfInfants = 0,
  } = userInput

  const { adultPrice = 0, childPrice = 0, infantPrice = 0 } = tourDetail || {}

  const totalPrice =
    adultPrice * numberOfAdults +
    childPrice * numberOfChilds +
    infantPrice * numberOfInfants

  return (
    <div className="block lg:hidden bottom-0 fixed inset-x-0 py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40 transition-transform duration-300 ease-in-out">
      <div className="container flex items-center justify-between">
        <div className="">
          <span className="block text-xl font-semibold">
            ${totalPrice}
            <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
              /person
            </span>
          </span>
          <ModalSelectDate
            renderChildren={({ openModal }) => (
              <span
                onClick={openModal}
                className="block text-sm underline font-medium"
              >
                {/* {converSelectedDateToString([startDate, endDate])} */}
                {startDate?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                }) || 'Start date'}
              </span>
            )}
          />
        </div>
        <ModalReserveMobile
          tourDetail={tourDetail}
          onClose={onClose}
          renderChildren={({ openModal }) => (
            <ButtonPrimary
              sizeClass="px-5 sm:px-7 py-2 !rounded-3xl"
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
    </div>
  )
}

export default MobileFooterSticky
