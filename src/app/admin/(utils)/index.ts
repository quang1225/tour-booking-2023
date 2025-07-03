import bcrypt from 'bcryptjs'
import jwt, { Secret } from 'jsonwebtoken'
import cookie from 'cookie'
import { NextRequest, NextResponse } from 'next/server'
import { CommonResponse } from '@/app/type'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { User } from '@/queries/types'
import { IS_USER_LOGGED_KEY } from '@/contains'

export interface ReCaptchaRes {
  success: boolean
  challenge_ts: string
  hostname: string
  score: number
  action: string
}

export const verifyReCaptcha = async (reCaptchaToken: string) => {
  const resReCaptcha = (await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${reCaptchaToken}`,
    {
      method: 'GET',
    }
  ).then((res) => res.json())) as ReCaptchaRes

  if (resReCaptcha.success) {
    return generateResponse({ message: 'Verify reCAPTCHA fail', status: 400 })
  }
}

export const serverLogoutUser = (req: NextRequest, res: NextResponse) => {
  deleteNextCookie(req, res, 'token')
  deleteNextCookie(req, res, IS_USER_LOGGED_KEY)
}

export const commonCheckUser = ({
  user,
  req,
  checkVerified = true,
}: {
  user: User
  req: NextRequest
  checkVerified?: boolean
}) => {
  let response = undefined

  if (!user.isActive)
    response = generateResponse({
      message: 'User is blocked',
      status: 400,
    })

  if (checkVerified && !user.isEmailVerified)
    response = generateResponse({
      message: 'User created but email not verified',
      status: 400,
    })

  if (response) {
    console.log('serverLogoutUser')
    serverLogoutUser(req, response)
    return response
  }

  return undefined
}

export type JwtUserData = {
  userEmail: string
  role: string
  iat: number
}

export const appRoles = {
  ADMIN: 'ADMIN',
  USER: 'USER',
}

export const generateResponse = ({
  status = 200,
  message = 'Success',
  data = null,
}: {
  status?: number
  message?: string
  data?: object | null
}) =>
  NextResponse.json(
    {
      message,
      status,
      data,
    } as CommonResponse,
    { status }
  )

export const deleteNextCookie = (
  request: NextRequest,
  response: NextResponse,
  key: string
) => {
  // workaround for NextJS
  const value = request.headers.get(key) || ''
  response.cookies.set(key, value) // value must be exact
  response.cookies.delete(key)
}

export const hashPhassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

export const generateJWT = async (userEmail: string, isAdmin = false) => {
  try {
    const token = await jwt.sign(
      {
        userEmail,
        role: isAdmin ? appRoles.ADMIN : appRoles.USER,
      } as JwtUserData,
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: '30d',
      }
    )
    return token
  } catch (error) {
    return ''
  }
}

export const generateEmailVerificationJWT = async (userEmail: string) => {
  try {
    const token = await jwt.sign(
      {
        userEmail,
      } as JwtUserData,
      (process.env.JWT_SECRET + userEmail) as Secret,
      {
        expiresIn: '1d',
      }
    )
    return token
  } catch (error) {
    return ''
  }
}

export const isValidEmailVerificationJWT = async (
  token: string,
  email: string
) => {
  try {
    if (!token) return {} as JwtUserData
    const decoded = (await jwt.verify(
      token,
      (process.env.JWT_SECRET + email) as Secret
    )) as JwtUserData
    const { userEmail } = decoded
    return userEmail === email
  } catch (error) {
    return true
  }
}

export const setUserCookies = async ({
  response,
  token,
}: {
  response: NextResponse
  token: string
}) => {
  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: 'strict',
    path: '/',
  })
  response.cookies.set({
    name: 'isUserLogged',
    value: 'true',
    maxAge: 60 * 60 * 24,
    sameSite: 'strict',
    path: '/',
  })
}

export const getTokenFromReq = (req: NextRequest) => {
  const cookieStr = req.headers.get('cookie') || ''
  const cookies = cookie.parse(cookieStr)
  const authorization = req.headers.get('authorization') || '' // for dev
  const token = cookies?.token || authorization.replace('Bearer ', '') || ''
  return token
}

export const validateAndGetUserEmailFromToken = async (req: NextRequest) => {
  try {
    const token = getTokenFromReq(req)
    const userData = await decodeJWT(token)
    const { userEmail } = userData
    return userEmail
  } catch (error) {
    return ''
  }
}

export const validateAndGetUserEmailFromSocialAcc = async () => {
  const session = await getServerSession(authOptions)
  return session?.user?.email || ''
}

export const validateAndGetUserEmail = async (req: NextRequest) => {
  // LOGIN BY TOKEN
  let userEmail = await validateAndGetUserEmailFromToken(req)
  if (!userEmail) {
    // LOGIN BY SOCIAL ACCOUNTS
    userEmail = await validateAndGetUserEmailFromSocialAcc()
  }
  return userEmail
}

export const decodeJWT = async (token = '') => {
  try {
    if (!token) return {} as JwtUserData
    const decoded = await jwt.verify(token, process.env.JWT_SECRET as Secret)
    return decoded as JwtUserData
  } catch (error) {
    return {} as JwtUserData
  }
}

export const comparePassword = (password: string, currentPassword: string) =>
  bcrypt.compareSync(password, currentPassword)

export const isInvalidObject = (keys: string[], object: Object) =>
  Object.keys(object).some((key) => !keys.includes(key))
export const isValidJSONString = (value: string) => {
  try {
    JSON.parse(value)
  } catch (error) {
    return false
  }
  return true
}
export type PreviewImage = {
  url: string
  isLoading?: boolean
}
