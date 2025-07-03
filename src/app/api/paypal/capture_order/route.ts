import { generateResponse, validateAndGetUserEmail } from '@/app/admin/(utils)'
import prisma from '@/app/admin/(utils)/prisma'
import paypalClient from '@/app/lib/paypal'
import { CommonResponse } from '@/app/type'
import { Order } from '@/queries/types'
import paypal from '@paypal/checkout-server-sdk'
import { PaymentSource } from '@paypal/checkout-server-sdk/lib/orders/lib'
import { NextRequest } from 'next/server'

export type CaptureOrderApiPayload = {
  orderId: string
  tourId: number
  otherRequest: string
  paymentMethod: string
  startDate: Date
  numberOfInfants: number
  numberOfChilds: number
  numberOfAdults: number
  adultPrice: number
  childPrice: number
  infantPrice: number
}

export type CaptureOrderApiResponse = {
  data: Order
} & CommonResponse

export async function POST(req: NextRequest) {
  try {
    const userEmail = await validateAndGetUserEmail(req)
    if (!userEmail)
      return generateResponse({
        message: 'User token invalid',
        status: 401,
      })

    const {
      orderId,
      tourId,
      otherRequest,
      paymentMethod,
      startDate,
      numberOfInfants,
      numberOfChilds,
      numberOfAdults,
      adultPrice,
      childPrice,
      infantPrice,
    }: CaptureOrderApiPayload = await req.json()

    // VALIDATE AND DELETE PAYPAL TOKEN
    const PaypalClient = paypalClient()
    const request = new paypal.orders.OrdersCaptureRequest(orderId)
    request.requestBody({
      payment_source: {} as PaymentSource,
    })

    const response = await PaypalClient.execute(request)
    if (!response) {
      throw new Error()
    }

    // CHECK CARD CHARGED OR NOT
    const paypalCheckoutData = response.result
    const paymentData =
      paypalCheckoutData.purchase_units[0].payments.captures[0] // because no PAY LATER so there is only 1 CAPTURE
    const { id: transactionId, status } = paymentData

    if (status !== 'COMPLETED') throw new Error()

    // const emailOfPayer = paypalCheckoutData.payer.email_address;

    // CREATE ORDER WITH FIXED PRICE
    const order = await prisma.order.create({
      data: {
        id: orderId,
        transactionId,
        user: {
          connect: {
            email: userEmail,
          },
        },
        tour: {
          connect: {
            id: tourId,
          },
        },
        status: 'PAID',
        paymentMethod,
        startDate,
        otherRequest,
        numberOfInfants,
        numberOfChilds,
        numberOfAdults,
        adultPrice,
        childPrice,
        infantPrice,
      },
    })

    return generateResponse({
      message: `Payment charged successfully`,
      status: 200,
      data: order,
    })
  } catch (err: any) {
    return generateResponse({
      message: err.message,
      // message: `Payment charged fail`,
      status: 500,
    })
  }
}
