'use client'

import React, { FC, useEffect } from 'react'
import { INIT_USER_INPUT, useAppContext } from '@/contexts/app'
import { Tour } from '@/queries/types'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import useMutateCreateOrder from '@/hooks/api/order/useMutateCheckout'
import useMutateCaptureOrder from '@/hooks/api/order/useMutateCaptureOrder'
import CommonSpinner from '@/components/common/CommonSpinner'
import { useRouter } from 'next/navigation'

export interface CommonPaypalButtonProps {
  tourDetail: Tour | undefined
  otherRequest?: string
}

const CommonPaypalButton: FC<CommonPaypalButtonProps> = ({
  tourDetail,
  otherRequest = '',
}) => {
  const { userInput, setUserInput } = useAppContext()
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer()
  const router = useRouter()

  const {
    startDate = new Date(),
    numberOfAdults = 0,
    numberOfChilds = 0,
    numberOfInfants = 0,
  } = userInput

  const {
    id,
    adultPrice = 0,
    childPrice = 0,
    infantPrice = 0,
  } = tourDetail || {}

  const totalPrice =
    adultPrice * numberOfAdults +
    childPrice * numberOfChilds +
    infantPrice * numberOfInfants

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
      },
    })
  }, [totalPrice])

  const { checkout, loadingCheckout } = useMutateCreateOrder()
  const { captureOrder, loadingCaptureOrder } = useMutateCaptureOrder()

  const onCheckout = async () => {
    const createOrderRes = await checkout({ totalPrice })
    if (createOrderRes.status !== 200) return ''

    const orderId = createOrderRes.data.orderId || ''
    return orderId
  }

  if (!id) return <></>

  const onPaypalApprove = async (data: any) => {
    const { orderID: orderId, paymentSource } = data

    const captureOrderRes = await captureOrder({
      orderId,
      tourId: id,
      paymentMethod: paymentSource,
      otherRequest,
      startDate,
      numberOfInfants,
      numberOfChilds,
      numberOfAdults,
      adultPrice,
      childPrice,
      infantPrice,
    })

    if (captureOrderRes.status !== 200) return

    // DONE PAYMENT
    setUserInput(INIT_USER_INPUT)
    router.push(`/bookings/${orderId}`)
  }

  if (isPending) return <CommonSpinner />

  if (loadingCaptureOrder)
    return (
      <div className="flex flex-col text-center">
        <CommonSpinner />
        <p className="mt-4">Charging...</p>
        <br />
        <p className="text-rose-600">
          <b>PLEASE DO NOT RELOAD OR CLOSE THE PAGE !</b>
        </p>
        <br />
        <p className="text-rose-600">
          If you have been charged but still do not have a booking code, please
          contact the administrator.
        </p>
      </div>
    )

  return (
    <>
      <PayPalButtons createOrder={onCheckout} onApprove={onPaypalApprove} />

      {loadingCheckout && <CommonSpinner />}
    </>
  )
}

export default CommonPaypalButton
