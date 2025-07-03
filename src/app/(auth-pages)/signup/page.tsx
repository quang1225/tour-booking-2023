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
import { useRouter, useSearchParams } from 'next/navigation'
import { Route } from 'next'
import LoginSocialButtons from '@/app/(client-components)/LoginSocialButtons'
import Script from 'next/script'

declare let grecaptcha: any

interface FormData {
  email: string
}

const signupApi = async (url: string, { arg }: { arg: SignupPayload }) =>
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json())

const PageSignUp: FC = () => {
  const { userInfo } = useAppContext()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loadingSocial, setLoadingSocial] = useState(false)
  const [loadingReCaptcha, setLoadingReCaptcha] = useState(false)

  const redirect = (searchParams.get('redirect') || '/') as Route

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const { trigger: signup, isMutating: loadingSignup } = useSWRMutation<
    UserInfoApiResponse,
    any,
    string,
    SignupPayload
  >('/api/user/signup', signupApi)

  const loading = loadingSignup || loadingReCaptcha

  const onSubmit: SubmitHandler<FormData> = async ({ email }) => {
    setLoadingReCaptcha(true)
    grecaptcha?.enterprise.ready(async () => {
      const reCaptchaToken = await grecaptcha?.enterprise.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: 'SIGNUP' }
      )
      setLoadingReCaptcha(false)

      const signupRes = await signup({ email, reCaptchaToken })
      if (signupRes?.status !== 200) return

      router.push(`/request-email-sent?email=${email}&type=signup`)
    })
  }

  useEffect(() => {
    if (userInfo.email) {
      router.replace(redirect)
    }
  }, [redirect, userInfo])

  return (
    <div className={`nc-PageSignUp  `}>
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />

      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>

        <div className="max-w-md mx-auto space-y-6">
          <LoginSocialButtons
            setLoading={setLoadingSocial}
            redirect={redirect}
          />

          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
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

            <ButtonPrimary
              type="submit"
              loading={loading}
              disabled={loading || loadingSocial}
            >
              {loading ? 'Signing up...' : 'Signup'}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link
              href={
                `/login${
                  redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''
                }` as Route
              }
              className="font-semibold underline"
            >
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default PageSignUp
