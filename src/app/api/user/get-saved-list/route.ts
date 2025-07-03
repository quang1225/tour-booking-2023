import { generateResponse, validateAndGetUserEmail } from '@/app/admin/(utils)'
import prisma from '@/app/admin/(utils)/prisma'
import { CommonResponse } from '@/app/type'
import { NextRequest } from 'next/server'

export type UserGetSavedListApiResponse = {
  data: {
    savedList: number[]
  }
} & CommonResponse

export async function GET(req: NextRequest) {
  try {
    const userEmail = await validateAndGetUserEmail(req)
    if (!userEmail)
      return generateResponse({
        message: 'User token invalid',
        status: 401,
      })

    const tours = await prisma.tour.findMany({
      where: {
        isActive: true,
        categories: {
          some: {
            isActive: true,
          },
        },
        users: {
          some: {
            email: userEmail,
          },
        },
      },
      include: {
        categories: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return generateResponse({
      message: 'Get user saved list successfully',
      status: 200,
      data: tours,
    })
  } catch (error) {
    return generateResponse({
      message: 'Something went wrong',
      status: 500,
    })
  }
}
