import React, { useEffect } from 'react'
import Button from '../Button'
import SideModal from './SideModal'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Input, Switch } from '@mui/material'
import {
  GET_CATEGORY_DETAIL_QUERY,
  CREATE_CATEGORY_MUTATE,
  UPDATE_CATEGORY_MUTATE,
} from '@/queries/tour'
import { Category } from '@/queries/types'
import { boolean, string } from 'yup'
import { useMutation, useQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Checkbox from '@/shared/Checkbox'
type Inputs = {
  name: string
  description: string
  isActive: boolean
}

interface Props {
  selectedCategory: Category | undefined
  refeshCateList: () => void
  visible: boolean
  onClose: () => void
  refestCount: () => void
}

const AddCategoryModal = ({
  visible,
  onClose,
  selectedCategory,
  refeshCateList,
  refestCount,
}: Props) => {
  const isUpdate = Boolean(selectedCategory)
  const { id, name = '', isActive = true } = selectedCategory || {}
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors: updateInfoErrors },
  } = useForm<Inputs>()
  const [addCategory, { data: addData, loading: loadingCreate }] = useMutation(
    CREATE_CATEGORY_MUTATE
  )
  const [updateCategory, { data: updateData, loading: loadingUpdate }] =
    useMutation(UPDATE_CATEGORY_MUTATE)
  const categoryDetail = selectedCategory
  const onSubmit: SubmitHandler<Inputs> = async ({
    isActive,
    name,
    description,
  }) => {
    let categoryRes
    if (isUpdate) {
      categoryRes = await updateCategory({
        variables: {
          data: {
            name: {
              set: name,
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
      categoryRes = await addCategory({
        variables: { data: { name, description } },
      })
    }

    if (categoryRes.data) {
      reset()
      toast.success(`${isUpdate ? 'Update' : 'Add'} success!`)
      refeshCateList()
      refestCount()
      onClose()
    } else {
      toast.error('Error!')
    }
  }
  const handleChange = (checked: boolean) => {
    setValue('isActive', checked)
  }

  useEffect(() => {
    setValue('name', name)
    setValue('isActive', isActive || false)
  }, [selectedCategory])
  return (
    <SideModal visible={visible} onClose={onClose}>
      <div className="h-full">
        <div className="flex flex-row align-center">
          <h2 className="text-3xl font-semibold mr-5">
            {' '}
            {isUpdate ? 'Edit' : 'Add'} Category
          </h2>
          {loadingUpdate || loadingCreate}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-8 gap-8"
        >
          <div className="flex items-center gap-2">
            <label>Tên Category:</label>
            <Input
              type="text"
              defaultValue={name}
              {...register('name', {
                required: 'Tên Category is required',
              })}
            />
          </div>

          {updateInfoErrors.name?.message && (
            <span className="text-sm text-rose-600">
              {updateInfoErrors.name?.message}
            </span>
          )}

          <div className="flex items-center gap-2">
            <label>Mô tả:</label>
            <Input
              type="text"
              defaultValue={name}
              {...register('description', {
                required: 'Mô tả is required',
              })}
            />
          </div>

          {updateInfoErrors.description?.message && (
            <span className="text-sm text-rose-600">
              {updateInfoErrors.description?.message}
            </span>
          )}

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
          <div className="mb-10">
            <ButtonPrimary
              disabled={loadingCreate || loadingUpdate}
              //   variant="primary"
              type="submit"
              loading={loadingCreate || loadingUpdate}
            >
              <b>{isUpdate ? 'Edit' : 'Add'} Category</b>
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </SideModal>
  )
}

export default AddCategoryModal
