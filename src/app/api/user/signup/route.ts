import {
  generateEmailVerificationJWT,
  generateResponse,
  verifyReCaptcha,
} from '@/app/admin/(utils)'
import prisma from '@/app/admin/(utils)/prisma'
import { sendVerifyEmail } from '@/app/admin/(utils)/sendMail'
import { validateUser } from '@/app/admin/(utils)/validation'
import { PartialBy } from '@/app/type'
import { NextRequest } from 'next/server'

export type SignupPayload = {
  email: string
  reCaptchaToken: string
}

export async function POST(req: NextRequest) {
  try {
    const requestData: SignupPayload = await req.json()
    const validationResponse = await validateUser(requestData, true)
    if (validationResponse) {
      const message =
        validationResponse?.errorMessage?.message || 'Invalid input provided'
      return generateResponse({ message, status: 400 })
    }

    const { email, reCaptchaToken } = requestData

    await verifyReCaptcha(reCaptchaToken)

    const user = await prisma.user.create({
      data: { email },
    })

    // Send verify account mail
    const emailToken = await generateEmailVerificationJWT(user.email)
    await sendVerifyEmail({
      email: email,
      emailToken,
    })

    const resUser: PartialBy<typeof user, 'password'> = { ...user }
    delete resUser.password

    const response = generateResponse({
      message: `Create account successfully! an verification email has been sent to ${email}`,
      status: 200,
      data: {
        user: resUser,
      },
    })

    return response
  } catch (error) {
    return generateResponse({
      message: 'Something went wrong',
      status: 401,
    })
  }
}
