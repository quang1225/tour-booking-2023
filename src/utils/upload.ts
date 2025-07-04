import ImageKit from 'imagekit'
import { ListFileOptions } from 'imagekit/dist/libs/interfaces'

export type UploadImagesFolderName = 'avatar' | 'tour'

const image_kit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC as string,
  privateKey: process.env.IMAGEKIT_PRIVATE as string,
  urlEndpoint: 'https://ik.imagekit.io/newgenweb',
})

export const upload_on_imagekit = async ({
  file,
  filename,
  folderName,
}: {
  file: File
  filename: string
  folderName: UploadImagesFolderName
  tags: string | string[]
}) => {
  const upload = await image_kit.upload({
    file: Buffer.from(await file.arrayBuffer()),
    fileName: filename,
    folder: `/mia-tour-booking-2023/${folderName}`,
    tags: folderName,
    useUniqueFileName: true,
    isPrivateFile: false,
  })
  return upload
}

export const delete_image_from_imagekit = (id: string) =>
  image_kit.deleteFile(id)

export const image_list_from_imagekit = (config: ListFileOptions) =>
  image_kit.listFiles(config)
