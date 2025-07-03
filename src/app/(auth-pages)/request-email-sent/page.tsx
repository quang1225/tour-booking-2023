'use client'

import React, { FC, useEffect } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { useAppContext } from '@/contexts/app'
import { useRouter, useSearchParams } from 'next/navigation'
import Script from 'next/script'

const PageSignUp: FC = () => {
  const { userInfo } = useAppContext()
  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get('email') || ''
  const type = searchParams.get('type') || ''

  useEffect(() => {
    if (userInfo.email) {
      router.replace('/')
    }
  }, [userInfo])

  if (!email || !type) {
    router.replace('/')
  }

  return (
    <div className={`nc-PageSignUp  `}>
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />

      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Request Email Sent
        </h2>

        <div className="mx-auto space-y-6">
          <div className="flex flex-col items-center gap-12">
            <span className="block text-center text-lg text-neutral-700 dark:text-neutral-300">
              A request link has been sent to your email{' '}
              <b>
                <i>{email}</i>
              </b>
              <br />
              <br />
              Please check and click on the link to{' '}
              {type === 'signup' ? 'verify your account' : ''}
              {type === 'forgotPass' ? 'reset your password' : ''}.
            </span>

            <ButtonPrimary href="/" type="button">
              Back to homepage
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageSignUp
