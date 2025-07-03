import { generateResponse, validateAndGetUserEmail } from '@/app/admin/(utils)'
import prisma from '@/app/admin/(utils)/prisma'
import { CommonResponse } from '@/app/type'
import { Order } from '@/queries/types'
import { NextRequest } from 'next/server'

export type GetOrderDetailApiResponse = {
  data: Order
} & CommonResponse

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const userEmail = await validateAndGetUserEmail(req)
    if (!userEmail)
      return generateResponse({
        message: 'User token invalid',
        status: 401,
      })

    const { orderId } = params

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
        tour: true,
      },
    })
    if (!order) {
      return generateResponse({
        message: 'Order not found',
        status: 404,
      })
    }

    if (order.user.email !== userEmail) {
      return generateResponse({
        message: 'Access denied order',
        status: 401,
      })
    }

    return generateResponse({
      data: order,
    })
  } catch (error) {
    return generateResponse({
      message: 'Something went wrong',
      status: 500,
    })
  }
}
