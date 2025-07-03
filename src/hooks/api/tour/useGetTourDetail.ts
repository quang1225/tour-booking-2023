'use client'

import { GetTourDetailApiResponse } from '@/app/api/tours/[tourId]/route'
import useSWR from 'swr'

const getTourDetailApi = async (url: string) =>
  await fetch(url, {
    method: 'GET',
  }).then((res) => res.json())

export default function useGetTourDetail(tourId: number) {
  const {
    data: tourDetailData,
    mutate: getTourDetail,
    isLoading: loadingGetTourDetail,
  } = useSWR<GetTourDetailApiResponse>(`/api/tours/${tourId}`, getTourDetailApi)

  return { tourDetailData, loadingGetTourDetail, getTourDetail }
}
