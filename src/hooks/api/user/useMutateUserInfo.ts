'use client'

import { UserInfoApiResponse } from '@/app/api/user/login/route'
import { UserInfo, useAppContext } from '@/contexts/app'
import { useEffect } from 'react'
import useSWRMutation from 'swr/mutation'

const getInfoApi = async (url: string) =>
  await fetch(url, {
    method: 'GET',
  }).then((res) => res.json())

export default function useMutateUserInfo(
  setUserInfoFromLayout?: (x: UserInfo) => void
) {
  const { setUserInfo } = useAppContext()
  const {
    data: identifyRes,
    trigger: getUserInfoMutate,
    isMutating: loadingGetUserInfo,
  } = useSWRMutation<UserInfoApiResponse>('/api/user/get-info', getInfoApi)

  useEffect(() => {
    const setUserInfoState = (props: UserInfo) => {
      if (setUserInfoFromLayout) {
        setUserInfoFromLayout(props)
      } else {
        setUserInfo(props)
      }
    }

    if (identifyRes?.status !== 200) {
      return
    }

    if (identifyRes.data) {
      const {
        email,
        avatar = '',
        fullname = '',
        savedList,
        isAdmin,
        isPasswordSet = false,
      } = identifyRes.data

      setUserInfoState({
        email,
        avatar,
        fullname,
        isAdmin: isAdmin || false,
        isPasswordSet,
        saveList: savedList.map((x) => x.id),
      })
    }
  }, [identifyRes])

  return { getUserInfoMutate, loadingGetUserInfo }
}
