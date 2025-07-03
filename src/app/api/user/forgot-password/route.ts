import {
  commonCheckUser,
  generateEmailVerificationJWT,
  generateResponse,
  verifyReCaptcha,
} from '@/app/admin/(utils)'
import prisma from '@/app/admin/(utils)/prisma'
import { sendForgotPassEmail } from '@/app/admin/(utils)/sendMail'
import { validateUser } from '@/app/admin/(utils)/validation'
import { User } from '@/queries/types'
import { NextRequest } from 'next/server'

export type ForgotPasswordPayload = {
  email: string
  reCaptchaToken: string
}

export async function POST(req: NextRequest) {
  try {
    const requestData: ForgotPasswordPayload = await req.json()
    const validationResponse = await validateUser(requestData)
    if (validationResponse) {
      const message =
        validationResponse?.errorMessage?.message || 'Invalid input provided'
      return generateResponse({ message, status: 400 })
    }

    const { email, reCaptchaToken } = requestData

    await verifyReCaptcha(reCaptchaToken)

    const user = await prisma.user.findUnique({
      where: { email },
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

    // Send reset password mail
    const emailToken = await generateEmailVerificationJWT(user.email)
    await sendForgotPassEmail({
      email: email,
      emailToken,
    })

    const response = generateResponse({
      message: `A reset password email has been sent to ${email}`,
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
