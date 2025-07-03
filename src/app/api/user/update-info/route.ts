import {
  commonCheckUser,
  generateResponse,
  validateAndGetUserEmail,
} from '@/app/admin/(utils)'
import prisma from '@/app/admin/(utils)/prisma'
import { PartialBy } from '@/app/type'
import { User } from '@/queries/types'
import { NextRequest } from 'next/server'

export type UpdateUserInfoApiPayload = {
  fullname: string
  avatar: string
}

export async function POST(req: NextRequest) {
  try {
    const { fullname, avatar }: UpdateUserInfoApiPayload = await req.json()
    if (!fullname)
      return generateResponse({
        message: 'Full name is required',
        status: 401,
      })

    const email = await validateAndGetUserEmail(req)
    if (!email)
      return generateResponse({
        message: 'User token invalid',
        status: 401,
      })

    const user = await prisma.user.update({
      where: { email },
      data: {
        fullname,
        avatar,
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

    const resUser: PartialBy<typeof user, 'password'> = user
    delete resUser.password

    return generateResponse({
      message: 'Update info successfully',
      status: 200,
      data: {
        user: resUser,
      },
    })
  } catch (error) {
    return generateResponse({
      message: 'Something went wrong',
      status: 500,
    })
  }
}
