import { generateResponse } from '@/app/admin/(utils)'
import prisma from '@/app/admin/(utils)/prisma'
import { CommonResponse } from '@/app/type'
import { Tour } from '@/queries/types'
import { NextRequest } from 'next/server'

export type GetTourDetailApiResponse = {
  data: Tour
} & CommonResponse

export async function GET(
  req: NextRequest,
  { params }: { params: { tourId: string } }
) {
  try {
    const { tourId } = params

    const tour = await prisma.tour.findFirst({
      where: {
        id: Number(tourId),
        isActive: true,
        categories: {
          some: {
            isActive: true,
          },
        },
      },
      include: {
        categories: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            name: true,
            isActive: true,
          },
        },
      },
    })
    if (!tour) {
      return generateResponse({
        message: 'Tour not found',
        status: 404,
      })
    }

    return generateResponse({
      data: tour,
    })
  } catch (error) {
    return generateResponse({
      message: 'Something went wrong',
      status: 500,
    })
  }
}
