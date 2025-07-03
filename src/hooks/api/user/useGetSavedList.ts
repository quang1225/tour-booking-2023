'use client'

import { UserGetSavedListApiResponse } from '@/app/api/user/get-saved-list/route'
import useSWR from 'swr'

const getSavedListApi = async (url: string) =>
  await fetch(url, {
    method: 'GET',
  }).then((res) => res.json())

export default function useGetSavedList() {
  const {
    data: savedListData,
    mutate: getSavedList,
    isLoading: loadingGetSavedList,
  } = useSWR<UserGetSavedListApiResponse>(
    '/api/user/get-saved-list',
    getSavedListApi
  )

  return { savedListData, loadingGetSavedList, getSavedList }
}
