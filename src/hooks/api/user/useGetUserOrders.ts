'use client'

import { GetUserOrderListApiResponse } from '@/app/api/user/orders/route'
import useSWR from 'swr'

const getUserOrdersApi = async (url: string) =>
  await fetch(url, {
    method: 'GET',
  }).then((res) => res.json())

export default function useGetUserOrders() {
  const {
    data: userOrdersData,
    mutate: getUserOrders,
    isLoading: loadingGetUserOrders,
  } = useSWR<GetUserOrderListApiResponse>('/api/user/orders', getUserOrdersApi)

  return { userOrdersData, loadingGetUserOrders, getUserOrders }
}
