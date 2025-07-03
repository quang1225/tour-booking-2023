'use client'

import { CommonResponse } from '@/app/type'
import { LOGIN_REQUIRED_ROUTES } from '@/contains'
import { INIT_USER_INFO, useAppContext } from '@/contexts/app'
import { signOut } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'

const logoutApi = async (url: string) =>
  await fetch(url, {
    method: 'GET',
  }).then((res) => res.json())

export default function useMutateLogout() {
  const pathname = usePathname()
  const router = useRouter()
  const { setUserInfo } = useAppContext()
  const { data: logoutRes, trigger: logoutMutate } =
    useSWRMutation<CommonResponse>('/api/user/logout', logoutApi)
  const [loadingLogout, setLoadingLogout] = useState(false)

  useEffect(() => {
    if (logoutRes?.status !== 200) return

    setUserInfo(INIT_USER_INFO)
  }, [logoutRes])

  const logout = async () => {
    setLoadingLogout(true)
    await signOut({ redirect: false, callbackUrl: pathname })
    const logoutRes = await logoutMutate()
    setLoadingLogout(false)

    if (LOGIN_REQUIRED_ROUTES.some((x) => pathname.includes(x))) {
      router.push('/')
    }

    return logoutRes
  }

  return { logout, loadingLogout }
}
