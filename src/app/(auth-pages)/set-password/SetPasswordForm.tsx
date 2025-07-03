'use client'

import React, { FC, useEffect, useState } from 'react'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { useForm, SubmitHandler } from 'react-hook-form'
import { UserInfoApiResponse } from '@/app/api/user/login/route'
import useSWRMutation from 'swr/mutation'
import { useAppContext } from '@/contexts/app'
import { useRouter, useSearchParams } from 'next/navigation'
import { SetPasswordPayload } from '@/app/api/user/set-password/route'
import { toast } from 'react-toastify'
import Script from 'next/script'

declare let grecaptcha: any

interface FormData {
  password: string
  confirmPassword: string
}

const setPasswordApi = async (
  url: string,
  { arg }: { arg: SetPasswordPayload }
) =>
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json())

const SetPasswordForm: FC = () => {
  const { userInfo } = useAppContext()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loadingReCaptcha, setLoadingReCaptcha] = useState(false)

  const emailToken = searchParams.get('token') || ''
  const email = searchParams.get('email') || ''

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const { trigger: setPassword, isMutating: loadingSetPassword } =
    useSWRMutation<UserInfoApiResponse, any, string, SetPasswordPayload>(
      '/api/user/set-password',
      setPasswordApi
    )

  const loading = loadingSetPassword || loadingReCaptcha

  const onSubmit: SubmitHandler<FormData> = async ({ password }) => {
    setLoadingReCaptcha(true)
    grecaptcha?.enterprise.ready(async () => {
      const reCaptchaToken = await grecaptcha?.enterprise.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: 'SET_PASSWORD' }
      )
      setLoadingReCaptcha(false)

      const signupRes = await setPassword({
        password,
        email,
        emailToken,
        reCaptchaToken,
      })
      if (signupRes?.status !== 200) return

      toast.success(signupRes.message)
      router.replace('/login')
    })
  }

  useEffect(() => {
    if (userInfo.email) {
      router.replace('/')
    }
  }, [userInfo])

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />

      <form
        className="grid grid-cols-1 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block">
          <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
            Password
          </span>
          <Input
            type="password"
            className="mt-1"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            disabled={loading}
          />
          <p className="mt-2 text-sm text-rose-600">
            {errors.password?.message}
          </p>
        </label>
        <label className="block">
          <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
            Confirm password
          </span>
          <Input
            type="password"
            className="mt-1"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              validate: (val: string) => {
                if (watch('password') != val) {
                  return 'Confirm password do no match'
                }
              },
            })}
            disabled={loading}
          />

          <p className="mt-2 text-sm text-rose-600">
            {errors.confirmPassword?.message}
          </p>
        </label>

        <ButtonPrimary type="submit" loading={loading} disabled={loading}>
          {loading ? 'Submiting...' : 'Submit'}
        </ButtonPrimary>
      </form>
    </div>
  )
}

export default SetPasswordForm
