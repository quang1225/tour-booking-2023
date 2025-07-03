import React, { useEffect } from 'react'
import SideModal, { SideModalI } from './SideModal'
import { User } from '@/queries/types'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@mui/material'
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/client'
import ButtonPrimary from '@/shared/ButtonPrimary'
import CommonSpinner from '@/components/common/CommonSpinner'
import { UPDATE_USER_MUTATE } from '@/queries/user'
import Checkbox from '@/shared/Checkbox'

type Inputs = {
  fullname: string
  isActive: boolean
}
interface UserUpdateModalI extends SideModalI {
  visible: boolean
  onClose: () => void
  selectedUser: User | undefined
  refeshUserList: () => void
}

const UserUpdateModal = ({
  visible,
  onClose,
  selectedUser,
  refeshUserList,
}: UserUpdateModalI) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>()
  const [updateUser, { loading: loadingUpdate }] =
    useMutation(UPDATE_USER_MUTATE)

  const handleChange = (checked: boolean) => {
    setValue('isActive', checked)
  }

  const { id, fullname, email, isActive } = selectedUser || {}

  useEffect(() => {
    setValue('fullname', fullname || '')
    setValue('isActive', isActive || false)
  }, [selectedUser])

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    let categoryRes
    categoryRes = await updateUser({
      variables: {
        data: {
          isActive: {
            set: formData.isActive,
          },
          fullname: {
            set: formData.fullname,
          },
        },
        where: {
          id: selectedUser?.id,
        },
      },
    })

    if (categoryRes.data) {
      toast.success(`Update success!`)
      refeshUserList()
      onClose()
      reset()
    } else {
      toast.error('Error!')
    }
  }
  return (
    <SideModal visible={visible} onClose={onClose}>
      <div className="flex flex-row align-center">
        <h2 className="text-3xl font-semibold mr-5">Update User infomation</h2>
        {loadingUpdate && <CommonSpinner />}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-8 gap-8"
      >
        <div className="flex items-center gap-2">
          <label>Email:</label>
          <br></br>
          <Input type="email" value={email} disabled />
        </div>

        <div className="flex items-center gap-2">
          <label>Họ Tên:</label>
          <Input
            {...register('fullname', {
              required: 'Họ Tên is required',
            })}
          />
          <p className="text-sm text-rose-600">{errors.fullname?.message}</p>
        </div>
        <div>
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
        <div className="pt-2">
          <ButtonPrimary
            type="submit"
            disabled={loadingUpdate}
            loading={loadingUpdate}
          >
            <b>Update</b>
          </ButtonPrimary>
        </div>
      </form>
    </SideModal>
  )
}
export default UserUpdateModal
