import {
  commonCheckUser,
  generateJWT,
  generateResponse,
  setUserCookies,
  validateAndGetUserEmail,
} from '@/app/admin/(utils)'
import prisma from '@/app/admin/(utils)/prisma'
import { PartialBy } from '@/app/type'
import { User } from '@/queries/types'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const userEmail = await validateAndGetUserEmail(req)
    if (!userEmail) {
      return generateResponse({
        message: 'User session invalid or user not logged in',
        status: 200,
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
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

    const isPasswordSet = !!user.password

    const resUser: PartialBy<typeof user, 'password'> = user
    delete resUser.password

    const response = generateResponse({
      message: 'Get user info successfully',
      status: 200,
      data: { ...resUser, isPasswordSet },
    })

    // set COOKIE when login by social account
    if (!user.password) {
      const token = await generateJWT(userEmail, !!user.isAdmin)
      setUserCookies({ response, token })
    }

    return response
  } catch (error: any) {
    return generateResponse({ message: 'Something went wrong', status: 500 })
  }
}
