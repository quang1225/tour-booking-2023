'use client'

import React, { Fragment, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Input, Message, MessageI } from '../Form'
import SideModal, { SideModalI } from './SideModal'
import { Tour } from '@/__generated__/graphql'
import { useMutation, useQuery } from '@apollo/client'
import {
  ADD_TOUR_MUTATE,
  GET_CATEGORIES_QUERY,
  UPDATE_TOUR_MUTATE,
} from '@/queries/tour'
import { toast } from 'react-toastify'
import ImagePicker from '../Form/ImagePicker'
import { PreviewImage } from '../../(utils)'
import dynamic from 'next/dynamic'
import ButtonPrimary from '@/shared/ButtonPrimary'
import {
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Switch,
} from '@mui/material'
import useMutateUploadImages from '@/hooks/api/useMutateUploadImages'
import ImageProduct from '../Form/ImageProduct'
import { Popover, Transition } from '@headlessui/react'
import Checkbox from '@/shared/Checkbox'

const CustomCKEditor = dynamic(
  () => import('@/app/admin/(components)/CustomCKEditor'),
  { ssr: false }
)

interface AddTourModal extends SideModalI {
  selectedProduct?: Tour | undefined
  onProductImageDelete: (imageId: string) => void
  refeshTour: () => void
  hideDetail: () => void
  refetchCount: () => void
}
type Inputs = {
  title: string
  adultPrice: string
  childPrice: string
  infantPrice: string
  description: string
  isActive: boolean
  duration: string
  featuredImages: FileList
  imageObject: FileList
  categories: number[]
  imageString: string
}
const AddTourModal: React.FC<AddTourModal> = ({
  visible,
  onClose,
  selectedProduct,
  refeshTour,
  hideDetail,
  refetchCount,
  //updateProductState,
  onProductImageDelete,
}) => {
  const { data: categoriesData } = useQuery(GET_CATEGORIES_QUERY)
  const allCategories = categoriesData?.categories || []
  const isUpdate = Boolean(selectedProduct)
  const [addTour, { loading: loadingTourCreate }] = useMutation(ADD_TOUR_MUTATE)

  const [updateTour, { loading: loadingTourUpdate }] =
    useMutation(UPDATE_TOUR_MUTATE)

  const { uploadImages, loadingUploadImages } = useMutateUploadImages()
  const [uploadedImages, setUploadedImages] = useState<
    Record<string, PreviewImage>
  >({})

  const ITEM_HEIGHT = 30
  const ITEM_PADDING_TOP = 5
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }
  const [ckEditorValue, setCkEditorValue] = useState('')
  const [Active, setisActive] = useState(true)
  useEffect(() => {}, [ckEditorValue])
  const {
    id,
    name = '',
    description = '',
    categories: currentCategories = [],
    adultPrice = 0,
    childPrice = 0,
    duration = '',
    infantPrice = 0,
    featuredImage = '',
    galleryImgs = '',
    isActive = true,
  } = selectedProduct || {}

  const {
    reset: resetAdd,
    handleSubmit,
    control,
    watch: wacthAdd,
    setValue,
    register: registerProduct,
    formState: { errors },
  } = useForm<Inputs>()
  const selectedCategories = wacthAdd('categories') || []

  const handleChange = (checked: boolean) => {
    setValue('isActive', checked)
  }
  const [featuredImagePreview, setfeaturedImagePreview] =
    useState(featuredImage)
  const galaryImgsForm = wacthAdd('imageObject')

  const featuredImageFiles = wacthAdd('featuredImages')

  const removeProductImage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const imageId = e.currentTarget.dataset.image
    if (imageId) {
      setUploadedImages((images) => { 
       delete images[imageId]
       return images
      })
    }
  }

  useEffect(() => {
    setValue('title', name)
    setValue('adultPrice', `${adultPrice}`)
    setValue('childPrice', `${childPrice}`)
    setValue('infantPrice', `${infantPrice}`)
    setValue('description', description || '')
    setValue('duration', duration || '')
    setValue(
      'categories',
      currentCategories.map((x) => x.id)
    )
    setfeaturedImagePreview(featuredImage)

    const imagess = galleryImgs.split(',') || []
    const images = imagess.reduce(
      (previous: any, url: string, index: any) => ({
        ...previous,
        [url]: {
          id: url,
          url: url,
        },
      }),
      {} as Record<string, PreviewImage>
    )
    setUploadedImages(images)
    setCkEditorValue(description || '')
    setValue('isActive', isActive || false)
  }, [selectedProduct,visible])
  useEffect(() => {
    if (featuredImageFiles?.[0]) {
      const imgSrc = URL.createObjectURL(featuredImageFiles?.[0])
      setfeaturedImagePreview(imgSrc)
    }
  }, [featuredImageFiles])


  useEffect(() => {
    if (!visible) {
      resetAdd()
      setUploadedImages({})
      setfeaturedImagePreview('')
    }
  }, [resetAdd, visible])
  const onSubmit: SubmitHandler<Inputs> = async ({
    adultPrice,
    childPrice,
    description,
    infantPrice,
    title,
    duration,
    imageObject,
    categories,
    isActive,
  }) => {
    if (!selectedCategories.length) {
      toast.warn('Vui lòng nhập phân loại !')
      return
    }

    let ImageLst = ''
    if (imageObject != undefined) {
      const imagesRes = await uploadImages({
        fileList: imageObject,
        folderName: 'tour',
      })
    const imgsnew = imagesRes.data?.images.join(',') || ''
    ImageLst = imgsnew.concat(",", galleryImgs);
    }

    let imgs =''
    if(featuredImageFiles.length >= 1){
      const imagesResF = await uploadImages({
        fileList: featuredImageFiles,
        folderName: 'tour',
      })
       imgs = imagesResF.data?.images[0] || ''
    }
    let tourRes
    if (isUpdate) {
      tourRes = await updateTour({
        variables: {
          data: {
            name: {
              set: title,
            },
            adultPrice: {
              set: Number.parseFloat(adultPrice).toFixed(2),
            },
            categories: {
              disconnect: currentCategories
                .filter((cate1) => !categories.includes(cate1.id))
                .map((cate2) => ({
                  id: Number(cate2.id),
                })), // remove de-selected items
              connect: categories.map((id) => ({
                id: Number(id),
              })), // add selected items
            },
            childPrice: {
              set: Number.parseFloat(childPrice).toFixed(2),
            },
            description: {
              set: ckEditorValue,
            },
            duration: {
              set: duration,
            },
            featuredImage: {
              set: imgs !== "" ? imgs : featuredImage,
            },
            galleryImgs: {
              set: ImageLst,
            },
            infantPrice: {
              set: Number.parseFloat(infantPrice).toFixed(2),
            },
            isActive: {
              set: isActive,
            },
          },
          where: {
            id: id,
          },
        },
      })
    } else {
      tourRes = await addTour({
        variables: {
          data: {
            adultPrice: Number.parseFloat(adultPrice).toFixed(2),
            childPrice: Number.parseFloat(childPrice).toFixed(2),
            description: ckEditorValue,
            duration: duration,
            featuredImage: imgs !== "" ? imgs : featuredImage,
            galleryImgs: ImageLst,
            infantPrice: Number.parseFloat(infantPrice).toFixed(2),
            name: title,
            categories: {
              connect: categories.map((ids) => ({
                id: Number(ids),
              })),
            },
          },
        },
      })
    }

    if (tourRes?.data) {
      toast.success(`${isUpdate ? 'Update' : 'Add'} success!`)
      refeshTour()
      refetchCount()
      onClose()
      resetAdd()
      selectedProduct = undefined
    } else {
      toast.error('Error!')
    }
  }

  return (
    <SideModal visible={visible} onClose={onClose}>
      <div>
        <h2 className="ff-lato font-black text-2xl">
          {selectedProduct !== undefined ? 'Edit' : 'Add'} Tour
        </h2>
        {loadingTourCreate || loadingTourUpdate}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label>
              <b>Tiêu đề</b>
            </label>
            <Controller
              name="title"
              control={control}
              // defaultValue={name}
              rules={{ required: 'Vui lòng nhập tên.' }}
              render={({ field }) => {
                const additionalInputProps = {} as MessageI

                if (errors.title?.message) {
                  additionalInputProps.messageType = 'error'
                  additionalInputProps.message = errors.title.message
                }
                return (
                  <Input type="text" {...field} {...additionalInputProps} />
                )
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>
              <b>Số ngày đêm</b>
            </label>
            <Controller
              name="duration"
              control={control}
              // defaultValue={duration}
              rules={{ required: 'Vui lòng nhập duration.' }}
              render={({ field }) => {
                const additionalInputProps = {} as MessageI

                if (errors.duration?.message) {
                  additionalInputProps.messageType = 'error'
                  additionalInputProps.message = errors.duration.message
                }
                return (
                  <Input
                    type="text"
                    // label="Duration"
                    {...field}
                    {...additionalInputProps}
                  />
                )
              }}
            />
          </div>

          <div className="flex justify-between gap-20">
            <div>
              <label>
                <b>Giá người lớn</b>
              </label>
              <Controller
                name="adultPrice"
                control={control}
                // defaultValue={''}
                rules={{
                  pattern: {
                    value: /^\d*(\.\d{0,2})?$/,
                    message:
                      'Please enter valid price. More than 2 decimal places are not allowed.',
                  },
                  required: 'Please enter price.',
                }}
                render={({ field }) => {
                  const additionalInputProps = {} as MessageI

                  if (errors.adultPrice?.message) {
                    additionalInputProps.messageType = 'error'
                    additionalInputProps.message = errors.adultPrice.message
                  }
                  return (
                    <Input
                      type="number"
                      icon="price"
                      className="basis-30"
                      {...field}
                      {...additionalInputProps}
                    />
                  )
                }}
              />
            </div>

            <div>
              <label>
                <b>Giá trẻ em</b>
              </label>
              <Controller
                name="childPrice"
                control={control}
                // defaultValue={''}
                rules={{
                  pattern: {
                    value: /^\d*(\.\d{0,2})?$/,
                    message:
                      'Please enter valid price. More than 2 decimal places are not allowed.',
                  },
                }}
                render={({ field }) => {
                  const additionalInputProps = {} as MessageI

                  if (errors.childPrice?.message) {
                    additionalInputProps.messageType = 'error'
                    additionalInputProps.message = errors.childPrice.message
                  }
                  return (
                    <Input
                      type="number"
                      icon="price"
                      className="basis-30"
                      {...field}
                      {...additionalInputProps}
                    />
                  )
                }}
              />
            </div>

            <div>
              <label>
                <b>Giá trẻ sơ sinh</b>
              </label>
              <Controller
                name="infantPrice"
                control={control}
                // defaultValue={''}
                rules={{
                  pattern: {
                    value: /^\d*(\.\d{0,2})?$/,
                    message:
                      'Please enter valid price. More than 2 decimal places are not allowed.',
                  },
                }}
                render={({ field }) => {
                  const additionalInputProps = {} as MessageI

                  if (errors.infantPrice?.message) {
                    additionalInputProps.messageType = 'error'
                    additionalInputProps.message = errors.infantPrice.message
                  }
                  return (
                    <Input
                      type="number"
                      icon="price"
                      className="basis-30"
                      {...field}
                      {...additionalInputProps}
                    />
                  )
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label>
              <b>Phân Loại</b>
            </label>
            <Popover className="relative">
              {({ open, close }) => (
                <>
                  <Popover.Button
                    className={`flex items-center justify-center px-3 py-2 sm:px-4 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${
                      open ? '!border-primary-500 ' : ''
                    } ${
                      selectedCategories?.length
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    <span>
                      {allCategories
                        ?.filter((x) => selectedCategories?.includes(x.id))
                        .map((y) => y.name)
                        .join(', ') || 'Chọn 1 hoặc nhiều phân loại...'}
                    </span>
                    <i className="las la-angle-down ml-2"></i>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                      <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                        <div className="relative flex flex-col px-5 py-6 space-y-5">
                          {allCategories.map((item) => {
                            if (!item.name) return <></>
                            return (
                              <Checkbox
                                key={item.id}
                                name={item.name}
                                label={item.name}
                                defaultChecked={selectedCategories?.includes(
                                  item.id
                                )}
                                checked={selectedCategories?.includes(item.id)}
                                onChange={(checked) => {
                                  if (checked) {
                                    setValue('categories', [
                                      ...selectedCategories,
                                      item.id,
                                    ])
                                  } else {
                                    setValue(
                                      'categories',
                                      selectedCategories?.filter(
                                        (id) => id !== item.id
                                      )
                                    )
                                  }
                                }}
                              />
                            )
                          })}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <label>
              <b>Ảnh chính</b>
            </label>
            <div className="relative overflow-hidden flex">
              <ImageProduct
                sizeClass="w-30 h-60"
                imgUrl={featuredImagePreview}
              />

              {featuredImagePreview === featuredImage && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="mt-1 text-xs">Đổi ảnh</span>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                {...registerProduct('featuredImages')}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <label>
              <b>Ảnh khác</b>
            </label>
            <Controller
              name="imageObject"
              control={control}
              rules={{
                validate: {
                  required: (value) => {
                    if (!value && !selectedProduct)
                      return 'Please upload atleast one image.'
                    return true
                  },
                },
              }}
              render={({ field: { onChange, value } }: any) => (
                <>
                  <ImagePicker
                    actionText="Upload Image"
                    uploadedImages={uploadedImages}
                    resetComponentState={!visible}
                    onImageRemove={removeProductImage}
                    maxUpload={10}
                    onChange={onChange}
                  />
                  {errors.imageObject &&
                    errors.imageObject.type === 'required' && (
                      <Message
                        messageType="error"
                        message={errors.imageObject.message || ''}
                      />
                    )}
                </>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Controller
              control={control}
              name="isActive"
              defaultValue={isActive}
              render={({ field: { value } }) => (
                <Checkbox
                  label="Trạng Thái Hoạt Động"
                  checked={value}
                  onChange={handleChange}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>
              <b>Mô tả</b>
            </label>
            <CustomCKEditor value={ckEditorValue} onChange={setCkEditorValue} />
          </div>

          <div>
            <ButtonPrimary
              type="submit"
              disabled={
                loadingTourCreate || loadingTourUpdate || loadingUploadImages
              }
              loading={
                loadingTourCreate || loadingTourUpdate || loadingUploadImages
              }
              className="my-10"
            >
              <b>{selectedProduct !== undefined ? 'Update' : 'Add'} Product</b>
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </SideModal>
  )
}

export default AddTourModal
