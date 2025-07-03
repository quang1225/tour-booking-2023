'use client'

import { GET_PUBLIC_CATEGORIES_QUERY } from '@/queries/tour'
import { Category } from '@/queries/types'
import { useQuery } from '@apollo/client'

export default function useGetCategories() {
  const { data: categoriesData, loading: loadingGetCategories } = useQuery(
    GET_PUBLIC_CATEGORIES_QUERY
  )

  const categories = (categoriesData?.categories || []) as Category[]

  return { categories, loadingGetCategories }
}
