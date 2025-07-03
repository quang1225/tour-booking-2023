import {
  commonCheckUser,
  comparePassword,
  generateJWT,
  generateResponse,
  setUserCookies,
  verifyReCaptcha,
} from '@/app/admin/(utils)'
import prisma from '@/app/admin/(utils)/prisma'
import { validateUser } from '@/app/admin/(utils)/validation'
import { CommonResponse, PartialBy } from '@/app/type'
import { User } from '@/queries/types'
import { NextRequest } from 'next/server'

export type LoginApiPayload = {
  email: string
  password: string
  reCaptchaToken: string
}

export type UserInfoApiResponse = {
  data: PartialBy<User, 'password'> & { isPasswordSet?: boolean }
} & CommonResponse

export async function POST(req: NextRequest) {
  try {
    const requestData: LoginApiPayload = await req.json()
    const validationResponse = await validateUser(requestData)
    if (validationResponse) {
      const message =
        validationResponse?.errorMessage?.message || 'Invalid input provided'
      return generateResponse({ message, status: 400 })
    }

    const { email, password, reCaptchaToken } = requestData

    await verifyReCaptcha(reCaptchaToken)

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

    if (!user.password)
      return generateResponse({
        message:
          'Please login using your signed social account, then you can set a password for your account',
        status: 400,
      })

    const isPasswordMatched = comparePassword(password, user.password || '')
    if (!isPasswordMatched) {
      generateResponse({ message: 'Wrong password', status: 400 })
    }

    const resUser: PartialBy<typeof user, 'password'> = user
    delete resUser.password

    const response = generateResponse({
      message: 'Login successfully',
      status: 200,
      data: {
        user: resUser,
      },
    })

    const token = await generateJWT(email)
    setUserCookies({ response, token })

    return response
  } catch (error) {
    return generateResponse({
      message: 'Something went wrong',
      status: 500,
    })
  }
}
