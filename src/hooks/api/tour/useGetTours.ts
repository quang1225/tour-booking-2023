'use client'

import { NullsOrder, SortOrder } from '@/__generated__/graphql'
import {
  GET_PUBLIC_TOURS_COUNT_QUERY,
  GET_PUBLIC_TOURS_QUERY,
} from '@/queries/tour'
import { Tour } from '@/queries/types'
import { useQuery } from '@apollo/client'

export const TOURS_PAGE_SIZE = 8

export const SORT_VALUE_ENUM = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  CHEAPEST: 'cheapest',
  PRICIEST: 'priciest',
} as const

export type SortKeys = keyof typeof SORT_VALUE_ENUM
export type SortValues = (typeof SORT_VALUE_ENUM)[SortKeys]

export const SORT_ENUM: {
  label: string
  value: SortValues
}[] = [
  {
    label: 'Newest',
    value: SORT_VALUE_ENUM.NEWEST,
  },
  {
    label: 'Oldest',
    value: SORT_VALUE_ENUM.OLDEST,
  },
  {
    label: 'Cheapest',
    value: SORT_VALUE_ENUM.CHEAPEST,
  },
  {
    label: 'Priciest',
    value: SORT_VALUE_ENUM.PRICIEST,
  },
]

export type PublicTourListApiPayload = {
  searchText?: string
  categories?: number[]
  minPrice?: number
  maxPrice?: number
  sort?: SortValues
  currentPage?: number
}

export default function useGetTours({
  searchText,
  categories,
  minPrice,
  maxPrice,
  sort,
  currentPage = 1,
}: PublicTourListApiPayload) {
  const createdAtSort =
    sort === SORT_VALUE_ENUM.NEWEST
      ? SortOrder.Desc
      : sort === SORT_VALUE_ENUM.OLDEST
      ? SortOrder.Asc
      : undefined

  const adultPriceSort =
    sort === SORT_VALUE_ENUM.CHEAPEST
      ? SortOrder.Asc
      : sort === SORT_VALUE_ENUM.PRICIEST
      ? SortOrder.Desc
      : undefined

  const { data: toursData, loading: loadingGetTours } = useQuery(
    GET_PUBLIC_TOURS_QUERY,
    {
      variables: {
        take: TOURS_PAGE_SIZE,
        skip: (currentPage - 1) * TOURS_PAGE_SIZE,
        where: {
          isActive: {
            equals: true,
          },
          name: {
            contains: searchText,
          },
          adultPrice: {
            gte: minPrice,
            lte: maxPrice,
          },
          categories: {
            some: {
              isActive: {
                equals: true,
              },
              id: {
                in: categories,
              },
            },
          },
        },
        orderBy: [
          {
            createdAt: createdAtSort,
          },
          {
            adultPrice: adultPriceSort,
          },
        ],
      },
    }
  )

  const { data: toursCountData } = useQuery(GET_PUBLIC_TOURS_COUNT_QUERY, {
    variables: {
      where: {
        isActive: {
          equals: true,
        },
        name: {
          contains: searchText,
        },
        adultPrice: {
          gte: minPrice,
          lte: maxPrice,
        },
        categories: {
          some: {
            isActive: {
              equals: true,
            },
            id: {
              in: categories,
            },
          },
        },
      },
    },
  })

  const tours = (toursData?.tours || []) as Tour[]

  const totalTours = toursCountData?.aggregateTour._count?.id || 0

  return { tours, loadingGetTours, totalTours }
}
