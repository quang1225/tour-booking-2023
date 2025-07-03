import { generateResponse, validateAndGetUserEmail } from '@/app/admin/(utils)'
import { CommonResponse } from '@/app/type'
import { UploadImagesFolderName, upload_on_imagekit } from '@/utils/upload'
import { NextRequest } from 'next/server'

export type UploadImagesApiResponse = {
  data?: {
    images: string[]
  }
} & CommonResponse

export async function POST(req: NextRequest) {
  try {
    const email = await validateAndGetUserEmail(req)
    if (!email)
      return generateResponse({
        message: 'User token invalid',
        status: 401,
      })

    const formData = await req.formData()
    const files = formData.getAll('files') as File[]
    const folderName = formData.get('folderName') as UploadImagesFolderName

    // const oldImages = await image_list_from_imagekit({
    //   name: 'abc.jpg',
    //   tags: folderName,
    // })

    const uploadRes = await Promise.all(
      files.map((file: File) =>
        upload_on_imagekit({
          file,
          filename: file.name,
          folderName: folderName,
          tags: folderName,
        })
      )
    )
    if (!uploadRes.length) {
      return generateResponse({
        message: 'Upload image fail',
        status: 500,
      })
    }

    const uploadedImages = uploadRes.map((x) => x.url)

    return generateResponse({
      message: `Upload image successfully`,
      status: 200,
      data: { images: uploadedImages },
    })
  } catch (error) {
    return generateResponse({
      message: 'Something went wrong',
      status: 500,
    })
  }
}
