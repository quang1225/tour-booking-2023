import {
  commonCheckUser,
  generateResponse,
  hashPhassword,
  isValidEmailVerificationJWT,
} from '@/app/admin/(utils)'
import prisma from '@/app/admin/(utils)/prisma'
import { validateUser } from '@/app/admin/(utils)/validation'
import { User } from '@/queries/types'
import { NextRequest } from 'next/server'

export type SetPasswordPayload = {
  password: string
  email: string
  emailToken: string
  reCaptchaToken: string
}

export async function POST(req: NextRequest) {
  try {
    const requestData: SetPasswordPayload = await req.json()
    const validationResponse = await validateUser(requestData)
    if (validationResponse) {
      const message =
        validationResponse?.errorMessage?.message || 'Invalid input provided'
      return generateResponse({ message, status: 400 })
    }

    const { email, password, emailToken, reCaptchaToken } = requestData

    const isValid = await isValidEmailVerificationJWT(emailToken, email)
    if (!isValid) {
      return generateResponse({ message: 'Token invalid', status: 400 })
    }

    const hashedPassword = await hashPhassword(password)

    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword, isEmailVerified: true },
    })

    if (!user)
      return generateResponse({
        message: 'User not found',
        status: 400,
      })

    const validUserErr = commonCheckUser({
      user: user as User,
      req,
      checkVerified: false,
    })
    if (validUserErr) return validUserErr

    const response = generateResponse({
      message: 'Set password successfully! You can try to login',
      status: 200,
    })

    return response
  } catch (error) {
    return generateResponse({
      message: 'Something went wrong',
      status: 401,
    })
  }
}
