'use client'

import React, { useEffect, useState } from 'react'
import Label from '@/components/Label'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import { useAppContext } from '@/contexts/app'
import { UpdateUserInfoApiPayload } from '@/app/api/user/update-info/route'
import { SubmitHandler, useForm } from 'react-hook-form'
import useSWRMutation from 'swr/mutation'
import { UpdateUserPasswordApiPayload } from '@/app/api/user/update-password/route'
import CommonSpinner from '@/components/common/CommonSpinner'
import { toast } from 'react-toastify'
import { UserInfoApiResponse } from '@/app/api/user/login/route'
import Avatar from '@/shared/Avatar'
import useMutateUploadImages from '@/hooks/api/useMutateUploadImages'

interface FormData {
  fullname: string
  avatarObject?: FileList
}

const updateUserInfoApi = async (
  url: string,
  { arg }: { arg: UpdateUserInfoApiPayload }
) =>
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json())

const updateUserPasswordApi = async (
  url: string,
  { arg }: { arg: UpdateUserPasswordApiPayload }
) =>
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json())

const AccountPage = () => {
  const { getUserInfo, userInfo, loadingGetUserInfo } = useAppContext()
  const { email, fullname, avatar, isPasswordSet } = userInfo
  const [avatarPreview, setAvatarPreview] = useState(avatar)

  const {
    register: registerUpdateInfo,
    watch: watchUpdateInfo,
    setValue: setValueUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: updateInfoErrors },
    reset: resetUpdateInfo,
  } = useForm<FormData>()

  const avatarFiles = watchUpdateInfo('avatarObject')

  const {
    register: registerUpdatePassword,
    watch: watchUpdatePassword,
    handleSubmit: handleSubmitUpdatePassword,
    formState: { errors: updatePasswordErrors },
    reset: resetUpdatePassword,
  } = useForm<UpdateUserPasswordApiPayload>()

  const { uploadImages, loadingUploadImages } = useMutateUploadImages()

  const { trigger: updateUserInfo, isMutating: loadingUpdateInfo } =
    useSWRMutation<UserInfoApiResponse, any, string, UpdateUserInfoApiPayload>(
      '/api/user/update-info',
      updateUserInfoApi
    )

  const { trigger: updateUserPassword, isMutating: loadingUpdatePassword } =
    useSWRMutation<
      UserInfoApiResponse,
      any,
      string,
      UpdateUserPasswordApiPayload
    >('/api/user/update-password', updateUserPasswordApi)

  const onSubmitUpdateInfo: SubmitHandler<FormData> = async (formData) => {
    const { fullname, avatarObject } = formData

    let newAvatar = avatar || ''

    if (avatarObject?.length) {
      const imagesRes = await uploadImages({
        fileList: avatarObject,
        folderName: 'avatar',
      })
      if (!imagesRes.data?.images[0]) return
      newAvatar = imagesRes.data?.images[0]
    }

    const updateUserInfoRes = await updateUserInfo({
      fullname,
      avatar: newAvatar,
    })
    if (updateUserInfoRes?.status !== 200) return

    resetUpdateInfo()
    toast.success(updateUserInfoRes.message)
    await getUserInfo()
  }

  const onSubmitUpdatePassword: SubmitHandler<
    UpdateUserPasswordApiPayload
  > = async (formData) => {
    const updateUserPasswordRes = await updateUserPassword(formData)
    if (updateUserPasswordRes?.status !== 200) return

    resetUpdatePassword()
    toast.success(updateUserPasswordRes.message)

    await getUserInfo()
  }

  const formDisabled =
    loadingGetUserInfo ||
    loadingUpdateInfo ||
    loadingUploadImages ||
    loadingUpdatePassword

  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    setValueUpdateInfo('fullname', fullname || '')
    setAvatarPreview(avatar)
  }, [userInfo])

  useEffect(() => {
    if (avatarFiles?.[0]) {
      const imgSrc = URL.createObjectURL(avatarFiles[0])
      setAvatarPreview(imgSrc)
    }
  }, [avatarFiles])

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING */}
      <div className="flex flex-row align-center">
        <h2 className="text-3xl font-semibold mr-5">Account infomation</h2>
        {loadingGetUserInfo && <CommonSpinner />}
      </div>

      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <form
        className="flex flex-col md:flex-row"
        onSubmit={handleSubmitUpdateInfo(onSubmitUpdateInfo)}
      >
        <div className="flex-shrink-0 flex justify-center items-start">
          <div className="relative rounded-full overflow-hidden flex">
            <Avatar
              sizeClass="w-32 h-32"
              userName={email}
              imgUrl={avatarPreview}
            />

            {avatarPreview === avatar && (
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

                <span className="mt-1 text-xs">Change Image</span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              {...registerUpdateInfo('avatarObject')}
            />
          </div>
        </div>

        <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
          <div>
            <Label>Email</Label>
            <Input type="email" className="mt-1.5" value={email} disabled />
          </div>

          <div>
            <Label>Full name</Label>
            <Input
              className="mt-1.5"
              {...registerUpdateInfo('fullname', {
                required: 'Full name is required',
              })}
              disabled={formDisabled}
            />
          </div>

          <span className="text-sm text-rose-600">
            {updateInfoErrors.fullname?.message}
          </span>

          <div className="pt-2">
            <ButtonPrimary
              type="submit"
              loading={loadingUpdateInfo || loadingUploadImages}
            >
              Save info
            </ButtonPrimary>
          </div>
        </div>
      </form>

      <h2 className="text-3xl font-semibold pt-8">
        {isPasswordSet ? 'Update' : 'Set'} your password
      </h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <form
        className=" max-w-xl space-y-6"
        onSubmit={handleSubmitUpdatePassword(onSubmitUpdatePassword)}
      >
        {isPasswordSet && (
          <div>
            <Label>Current password</Label>
            <Input
              type="password"
              className="mt-1.5"
              {...registerUpdatePassword('currentPassword', {
                required: 'Current Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              disabled={formDisabled}
            />
            <p className="mt-2 text-sm text-rose-600">
              {updatePasswordErrors.currentPassword?.message}
            </p>
          </div>
        )}
        <div>
          <Label>New password</Label>
          <Input
            type="password"
            className="mt-1.5"
            {...registerUpdatePassword('newPassword', {
              required: 'New password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            disabled={formDisabled}
          />
          <p className="mt-2 text-sm text-rose-600">
            {updatePasswordErrors.newPassword?.message}
          </p>
        </div>
        <div>
          <Label>Confirm password</Label>
          <Input
            type="password"
            className="mt-1.5"
            {...registerUpdatePassword('confirmPassword', {
              required: 'Confirm Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              validate: (val: string) => {
                if (watchUpdatePassword('newPassword') != val) {
                  return 'Confirm password do no match'
                }
              },
            })}
            disabled={formDisabled}
          />
          <p className="mt-2 text-sm text-rose-600">
            {updatePasswordErrors.confirmPassword?.message}
          </p>
        </div>

        <div className="pt-2">
          <ButtonPrimary
            type="submit"
            loading={loadingUpdatePassword}
            disabled={formDisabled}
          >
            {isPasswordSet ? 'Update' : 'Set'} password
          </ButtonPrimary>
        </div>
      </form>
    </div>
  )
}

export default AccountPage
