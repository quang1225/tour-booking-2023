import Image from 'next/image'
// import facebookSvg from '@/images/Facebook.svg'
// import twitterSvg from "@/images/Twitter.svg";
import googleSvg from '@/images/Google.svg'
import { signIn } from 'next-auth/react'
import SpinnerIcon from '@/app/(client-components)/SpinnerIcon'
import { useState } from 'react'

export interface LoginSocialButtonsProps {
  setLoading: (x: boolean) => void
  redirect: string
}

const LOGIN_SOCIALS = [
  {
    id: 'google',
    name: 'Continue with Google',
    icon: googleSvg,
  },
  // {
  //   id: 'facebook',
  //   name: 'Continue with Facebook',
  //   icon: facebookSvg,
  // },
]

export default function LoginSocialButtons({
  redirect,
  setLoading,
}: LoginSocialButtonsProps) {
  const [loadingSocialId, setLoadingSocialId] = useState('')

  const onClickLoginSocial = (socialId: string) => {
    setLoading?.(true)
    setLoadingSocialId(socialId)
    signIn(socialId, { redirect: false, callbackUrl: redirect })
  }

  return (
    <div className="grid gap-3">
      {LOGIN_SOCIALS.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            onClickLoginSocial(item.id)
          }}
          className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6  cursor-pointer"
        >
          <div className="w-6 h-6">
            {loadingSocialId === item.id && <SpinnerIcon />}
            {loadingSocialId !== item.id && (
              <Image src={item.icon} alt={item.name} />
            )}
          </div>

          <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
            {item.name}
          </h3>
        </div>
      ))}
    </div>
  )
}
