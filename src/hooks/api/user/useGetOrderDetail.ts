'use client'

import { GetOrderDetailApiResponse } from '@/app/api/user/orders/[orderId]/route'
import useSWR from 'swr'

const getOrderDetailApi = async (url: string) =>
  await fetch(url, {
    method: 'GET',
  }).then((res) => res.json())

export default function useGetOrderDetail(orderId: string) {
  const {
    data: orderDetailData,
    mutate: getOrderDetail,
    isLoading: loadingGetOrderDetail,
  } = useSWR<GetOrderDetailApiResponse>(
    `/api/user/orders/${orderId}`,
    getOrderDetailApi
  )

  return { orderDetailData, loadingGetOrderDetail, getOrderDetail }
}
