'use client'

import { UploadImagesApiResponse } from '@/app/api/upload-images/route'
import { UploadImagesFolderName } from '@/utils/upload'
import useSWRMutation from 'swr/mutation'

interface UploadImagesPayload {
  fileList: FileList
  folderName: UploadImagesFolderName
}

const uploadImagesApi = async (url: string, { arg }: { arg: FormData }) =>
  await fetch(url, {
    method: 'POST',
    body: arg,
  }).then((res) => res.json())

export default function useMutateUploadImages() {
  const { trigger: triggerUploadImages, isMutating: loadingUploadImages } =
    useSWRMutation<UploadImagesApiResponse, any, string, FormData>(
      '/api/upload-images',
      uploadImagesApi
    )

  const uploadImages = async ({
    fileList,
    folderName,
  }: UploadImagesPayload) => {
    const formData = new FormData()

    Object.keys(fileList).forEach((key) => {
      const file = fileList[Number(key)]
      formData.append('files', file, file.name)
      formData.append('folderName', folderName)
    })

    return await triggerUploadImages(formData)
  }

  return { uploadImages, loadingUploadImages }
}
