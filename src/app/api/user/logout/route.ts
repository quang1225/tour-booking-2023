import { generateResponse, serverLogoutUser } from '@/app/admin/(utils)'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const response = generateResponse({
      message: 'Log out successfully',
      status: 200,
    })

    serverLogoutUser(req, response)

    return response
  } catch (error) {
    return generateResponse({
      message: 'Something went wrong',
      status: 500,
    })
  }
}
