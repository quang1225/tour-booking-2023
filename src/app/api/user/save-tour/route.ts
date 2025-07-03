import {
  commonCheckUser,
  generateResponse,
  validateAndGetUserEmail,
} from '@/app/admin/(utils)'
import prisma from '@/app/admin/(utils)/prisma'
import { CommonResponse } from '@/app/type'
import { User } from '@/queries/types'
import { NextRequest } from 'next/server'

export type UserSaveTourApiPayload = {
  tourId: number
  isSave: boolean
}

export type UserSaveTourApiResponse = {
  data: {
    savedList: number[]
  }
} & CommonResponse

export async function POST(req: NextRequest) {
  try {
    const { tourId, isSave }: UserSaveTourApiPayload = await req.json()

    const email = await validateAndGetUserEmail(req)
    if (!email)
      return generateResponse({
        message: 'User token invalid',
        status: 401,
      })

    const user = await prisma.user.update({
      where: { email },
      data: {
        savedList: {
          [isSave ? 'connect' : 'disconnect']: [
            {
              id: tourId,
            },
          ],
        },
      },
      include: {
        savedList: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!user)
      return generateResponse({
        message: 'User not found',
        status: 400,
      })

    const validUserErr = commonCheckUser({
      user: user as User,
      req,
    })
    if (validUserErr) return validUserErr

    return generateResponse({
      message: `${isSave ? 'Save' : 'Unsave'} tour successfully`,
      status: 200,
      data: { savedList: user.savedList.map((x) => x.id) },
    })
  } catch (error) {
    return generateResponse({
      message: 'Something went wrong',
      status: 500,
    })
  }
}
