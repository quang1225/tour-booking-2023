import { generateResponse } from '@/app/admin/(utils)'
import prisma from '@/app/admin/(utils)/prisma'
import { CommonResponse } from '@/app/type'
import { Category } from '@/queries/types'
import { NextRequest } from 'next/server'

export type GetCategoriesApiResponse = {
  data: Category[]
} & CommonResponse

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
    })

    return generateResponse({
      data: categories,
    })
  } catch (error) {
    return generateResponse({
      message: 'Something went wrong',
      status: 500,
    })
  }
}
