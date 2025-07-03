import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { Delete, ImageOutlined } from '@mui/icons-material'
import { PreviewImage } from '../../(utils)/index'
import Label from './Label'
import { toast } from 'react-toastify'

interface ImagePickerI {
  label?: string
  actionText?: string
  uploadedImages?: Record<string, PreviewImage>
  maxUpload: number
  resetComponentState: boolean
  className?: string
  onImageRemove?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onChange: (files: File[] | File) => void
}

function generateURLFromFiles(files: File[]) {
  const urls: PreviewImage[] = []
  Array.from(files).map((file) => {
    const url = URL.createObjectURL(file)
    urls.push({ url })
  })
  return urls
}

function isValidMediaSelected(files: File[]) {
  const isInvalidFileExist = files.some((file) => !file.type.includes('image'))
  return !isInvalidFileExist
}

const ImagePicker = ({
  label,
  actionText,
  resetComponentState,
  uploadedImages,
  maxUpload,
  onChange,
  className,
  onImageRemove,
}: ImagePickerI) => {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const selectedFiles = useRef<File[] | null>(null)
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([])
  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files

    if (fileList?.length) {
      if (!isValidMediaSelected(Array.from(fileList))) {
        toast.error('Please select valid image file.')
      } else {
        const isSingleUpload = maxUpload === 1
        const selectedUploadFiles = Array.from(fileList)
        const files =
          !isSingleUpload && selectedFiles.current
            ? [...selectedFiles.current, ...selectedUploadFiles]
            : selectedUploadFiles
        if (files.length > maxUpload) {
          toast.error(`You're allowed to upload ${maxUpload} images.`)
        } else {
          const urls = generateURLFromFiles(files)
          setPreviewImages(
            !isSingleUpload && uploadedImages
              ? [...Object.values(uploadedImages), ...urls]
              : urls
          )
          selectedFiles.current = files
          onChange(isSingleUpload ? files[0] : files)
        }
      }
    }

    if (fileRef.current) {
      fileRef.current.value = ''
    }
  }
  const onClickRemoveImg = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const imageId = e.currentTarget.dataset.image
    if (imageId) {
      setPreviewImages((images) =>images.filter(x=>x.url !== imageId))
     onImageRemove?.(e)
     //onChange(selectedFiles.current || [] )
     selectedFiles.current =null;
    }
  }
  useEffect(() => {
    if (uploadedImages) {
      setPreviewImages((previousImages) => {
        const updatedIds = Object.keys(uploadedImages)

        // Set "null" for remove image else update with "uploadedImages" if "id" match
        // else return the default image
        function filterRemoveImage(image: PreviewImage) {
          if (image.url && !updatedIds.includes(image.url)) {
            return null
          }
          if (
            image.url &&
            updatedIds.includes(image.url) &&
            uploadedImages
          ) {
            return uploadedImages[image.url]
          }
          return image
        }
        const images = previousImages.length
          ? (previousImages
              .map(filterRemoveImage)
              .filter((image) => image !== null) as PreviewImage[])
          : Object.values(uploadedImages)

        return images
      })
    }
  }, [uploadedImages])

  useEffect(() => {
    if (resetComponentState) {
      setPreviewImages([])
      selectedFiles.current = null
    }
  }, [resetComponentState])

  return (
    <>
      <div className={`w-full mb-3.5 ${className}`}>
        <label className="ff-lato text-xs font-extrabold inline-block mb-1">
          {label || 'Add Image'}
        </label>
        <div className="flex flex-row flex-wrap">
          {previewImages.map(({ url, isLoading }, index) => (
            <div
              key={url || index}
              className={`relative ${isLoading ? 'opacity-50' : 'opacity-1'}`}
            >
              <div
                className={
                  'relative w-24 h-fit bg-lightGray p-2 border-gray border-1 rounded-lg mr-2 mb-1 mt-1 $'
                }
              >
                <Image src={url} width={300} height={300} alt="" />
              </div>

              {url !== null && (
                <button
                  type="button"
                //  onClick={onImageRemove}
                    onClick={onClickRemoveImg}
                  data-image={url}
                  className="text-danger flex flex-row items-center"
                >
                  <Delete fontSize="small" />
                  <span> {isLoading ? 'Removing....' : 'Remove'}</span>
                </button>
              )}
            </div>
          ))}
          <input
            type="file"
            id="file"
            name="file"
            className="w-0 h-0 opacity-0"
            ref={fileRef}
            accept="image/*"
            onChange={onFileSelect}
          />
          <label
            className="w-24 h-24 bg-lightGray border-gray border-1 flex flex-col items-center justify-center rounded-lg font-bold text-lightBlack text-xs mt-1"
            htmlFor="file"
          >
            <ImageOutlined />
            <span>{actionText || 'Add Images'}</span>
          </label>
        </div>
      </div>
    </>
  )
}

export default ImagePicker
