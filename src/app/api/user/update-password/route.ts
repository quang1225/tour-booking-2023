import {
  comparePassword,
  generateResponse,
  validateAndGetUserEmail,
  hashPhassword,
  commonCheckUser,
} from '@/app/admin/(utils)'
import prisma from '@/app/admin/(utils)/prisma'
import { validateUser } from '@/app/admin/(utils)/validation'
import { PartialBy } from '@/app/type'
import { User } from '@/queries/types'
import { NextRequest } from 'next/server'

export type UpdateUserPasswordApiPayload = {
  currentPassword?: string
  newPassword: string
  confirmPassword: string
}

export async function POST(req: NextRequest) {
  try {
    const { currentPassword, newPassword }: UpdateUserPasswordApiPayload =
      await req.json()

    const email = await validateAndGetUserEmail(req)
    if (!email)
      return generateResponse({
        message: 'User token invalid',
        status: 401,
      })

    const validationResponse = await validateUser({
      email,
      password: newPassword,
    })
    if (validationResponse) {
      const message =
        validationResponse?.errorMessage?.message || 'Invalid input provided'
      return generateResponse({ message, status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
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

    // if login with password instead of social account
    if (currentPassword && user.password) {
      if (!comparePassword(currentPassword, user.password)) {
        return generateResponse({
          message: 'Wrong current password',
          status: 400,
        })
      }
    }

    const hashedPassword = await hashPhassword(newPassword)
    const updatedUser = await prisma.user.update({
      where: { email, isActive: true },
      data: {
        password: hashedPassword,
      },
    })

    if (!updatedUser)
      return generateResponse({
        message: 'Update user info fail',
        status: 400,
      })

    const resUser: PartialBy<typeof updatedUser, 'password'> = updatedUser
    delete resUser.password

    return generateResponse({
      message: 'Update password successfully',
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
