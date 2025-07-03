'use client'

import React, { FC, useEffect, useState } from 'react'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { UserInfoApiResponse } from '@/app/api/user/login/route'
import useSWRMutation from 'swr/mutation'
import { SignupPayload } from '@/app/api/user/signup/route'
import { useAppContext } from '@/contexts/app'
import { useRouter } from 'next/navigation'
import Script from 'next/script'

declare let grecaptcha: any

interface FormData {
  email: string
}

const forgotPasswordApi = async (
  url: string,
  { arg }: { arg: SignupPayload }
) =>
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json())

const PageSignUp: FC = () => {
  const { userInfo } = useAppContext()
  const router = useRouter()
  const [loadingReCaptcha, setLoadingReCaptcha] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const { trigger: forgotPassword, isMutating: loadingForgotPassword } =
    useSWRMutation<UserInfoApiResponse, any, string, SignupPayload>(
      '/api/user/forgot-password',
      forgotPasswordApi
    )

  const loading = loadingForgotPassword || loadingReCaptcha

  const onSubmit: SubmitHandler<FormData> = async ({ email }) => {
    setLoadingReCaptcha(true)
    grecaptcha?.enterprise.ready(async () => {
      const reCaptchaToken = await grecaptcha?.enterprise.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: 'FORGOT_PASSWORD' }
      )
      setLoadingReCaptcha(false)

      const forgotPasswordRes = await forgotPassword({ email, reCaptchaToken })
      if (forgotPasswordRes?.status !== 200) return

      router.push(`/request-email-sent?email=${email}&type=forgotPass`)
    })
  }

  useEffect(() => {
    if (userInfo.email) {
      router.replace('/')
    }
  }, [userInfo])

  return (
    <div className={`nc-PageSignUp  `}>
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />

      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Reset your password
        </h2>

        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                className="mt-1"
                disabled={loading}
              />
              <p className="mt-2 text-sm text-rose-600">
                {errors.email?.message}
              </p>
            </label>

            <ButtonPrimary type="submit" loading={loading} disabled={loading}>
              {loading ? 'Sending...' : 'Send reset password mail'}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            or back to {` `}
            <Link href="/login" className="font-semibold underline">
              Login
            </Link>{' '}
            page
          </span>
        </div>
      </div>
    </div>
  )
}

export default PageSignUp
