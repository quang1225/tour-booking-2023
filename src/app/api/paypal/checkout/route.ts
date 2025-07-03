import { generateResponse, validateAndGetUserEmail } from '@/app/admin/(utils)'
import paypalClient from '@/app/lib/paypal'
import { CommonResponse } from '@/app/type'
import paypal from '@paypal/checkout-server-sdk'
import { NextRequest } from 'next/server'

export type CheckoutApiPayload = {
  totalPrice: number
}

export type CheckoutApiApiResponse = {
  data: { orderId: string }
} & CommonResponse

export async function POST(req: NextRequest) {
  try {
    const userEmail = await validateAndGetUserEmail(req)
    if (!userEmail)
      return generateResponse({
        message: 'User token invalid',
        status: 401,
      })

    const { totalPrice }: CheckoutApiPayload = await req.json()

    const PaypalClient = paypalClient()
    const request = new paypal.orders.OrdersCreateRequest()
    request.headers['Prefer'] = 'return=representation'
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: `${totalPrice}`,
          },
        },
      ],
    })
    const response = await PaypalClient.execute(request)
    const orderId = response?.result?.id

    if (response.statusCode !== 201 || !orderId) {
      return generateResponse({
        message: `Create order fail`,
        status: 500,
      })
    }

    return generateResponse({
      message: `Create payment successfully`,
      status: 200,
      data: { orderId },
    })
  } catch (err: any) {
    return generateResponse({
      message: err.message,
      // message: `Create payment fail`,
      status: 500,
    })
  }
}
