import { generateResponse, validateAndGetUserEmail } from '@/app/admin/(utils)'
import prisma from '@/app/admin/(utils)/prisma'
import { CommonResponse } from '@/app/type'
import { Order } from '@/queries/types'
import { NextRequest } from 'next/server'

export type GetUserOrderListApiResponse = {
  data: Order[]
} & CommonResponse

export async function GET(req: NextRequest) {
  try {
    const userEmail = await validateAndGetUserEmail(req)
    if (!userEmail)
      return generateResponse({
        message: 'User token invalid',
        status: 401,
      })

    const orders = await prisma.order.findMany({
      where: {
        user: {
          email: userEmail,
        },
      },
      include: {
        tour: true,
      },
    })

    return generateResponse({
      message: 'Get user orders successfully',
      status: 200,
      data: orders,
    })
  } catch (error) {
    return generateResponse({
      message: 'Something went wrong',
      status: 500,
    })
  }
}
