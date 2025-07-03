import { useAppContext } from '@/contexts/app'
import { Tour } from '@/queries/types'
import { FC } from 'react'

export interface TourPriceDetailProps {
  tourDetail: Tour | undefined
  isCheckout?: boolean
}

export default function TourPriceDetail({
  tourDetail,
  isCheckout,
}: TourPriceDetailProps) {
  const { userInput } = useAppContext()
  const {
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
    <div className="flex flex-col space-y-4">
      {isCheckout && <h3 className="text-2xl font-semibold">Price detail</h3>}

      <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
        <span>
          ${adultPrice} x {numberOfAdults} adult
          {numberOfAdults > 1 ? 's' : ''}
        </span>
        <span>${adultPrice * numberOfAdults}</span>
      </div>

      {!!numberOfChilds && (
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span>
            ${childPrice} x {numberOfChilds} child
            {numberOfChilds > 1 ? 's' : ''}
          </span>
          <span>${childPrice * numberOfChilds}</span>
        </div>
      )}

      {!!numberOfInfants && (
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span>
            ${infantPrice} x {numberOfInfants} infant
            {numberOfInfants > 1 ? 's' : ''}
          </span>
          <span>${infantPrice * numberOfInfants}</span>
        </div>
      )}

      {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>$0</span>
          </div> */}

      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>
    </div>
  )
}
