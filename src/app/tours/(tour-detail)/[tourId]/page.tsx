import React, { FC } from 'react'
import TourDetail from './TourDetail'
import { Metadata } from 'next'
import { Tour } from '@/queries/types'

interface Props {
  searchParams: { id: string }
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const tourId = Number(searchParams.id)

  const tourDetailData = await fetch(
    `${process.env.NEXT_PUBLIC_APP_ORIGIN}/api/tours/${tourId}/metadata`,
    {
      method: 'GET',
    }
  ).then((res) => res.json())
  const tourDetail = tourDetailData?.data as Tour
  const {
    name = '',
    description = '',
    featuredImage = '',
    duration = '',
    categories = [],
  } = tourDetail || {}

  return {
    title: `${name} - ${categories
      .map((x) => x.name)
      .join(', ')} - ${duration}`,
    description: description?.slice(0, 100),
    openGraph: {
      images: [featuredImage],
    },
  }
}

const TourDetailPage: FC<Props> = async ({ searchParams }) => {
  const tourId = Number(searchParams.id)

  return <TourDetail tourId={tourId} />
}

export default TourDetailPage
