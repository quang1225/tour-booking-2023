import React, { FC } from 'react'
import SetPasswordForm from './SetPasswordForm'
import { redirect } from 'next/navigation'
import { isValidEmailVerificationJWT } from '@/app/admin/(utils)'

interface Props {
  searchParams: { token: string; email: string }
}

const SetPasswordPage: FC<Props> = async ({ searchParams }) => {
  const { token, email } = searchParams

  if (!token || !email) redirect('/404')

  if (!(await isValidEmailVerificationJWT(token, email))) redirect('/404')

  return (
    <div className={`nc-PageSignUp  `}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Set your password
        </h2>

        <SetPasswordForm />
      </div>
    </div>
  )
}

export default SetPasswordPage
