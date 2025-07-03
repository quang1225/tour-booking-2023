import { object, string, ValidationError } from 'yup'
import prisma from './prisma'
import { generateResponse } from '.'

type ResponseError = {
  key: string
  message: string
}

interface FileType {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: string
  size: number
}

const handleError = (errors: any) => {
  if (errors instanceof ValidationError) {
    let errorMessage = {} as ResponseError

    const err = errors.inner.map((error, index) => {
      const errorInfo = { key: error.path || '', message: error.message }

      if (index === 0) {
        errorMessage = errorInfo
      }
      return errorInfo
    })

    return { errors: err, errorMessage }
  }
}

interface ValidateUserProps {
  email: string
  password?: string
}

export const validateUser = async (
  values: ValidateUserProps,
  validateEmailExistence = false
) => {
  try {
    const schema = object().shape({
      password: values.password
        ? string()
            .trim()
            .required('Password is required.')
            .label('password')
            .min(8)
        : string(),
      email: string()
        .trim()
        .required('Email address is required.')
        .email('Email address is not valid.')
        .label('email')
        .test(
          'isValidEmail',
          'Product images is not valid.Please check image type.',
          async (value, { createError, path }) => {
            if (validateEmailExistence) {
              const isEmailExist =
                (await prisma.user.count({
                  where: { email: value },
                })) > 0

              if (isEmailExist) {
                return createError({
                  path,
                  message: 'Email address is already registered.',
                })
              }
            }

            return true
          }
        ),
    })

    await schema.validate(values, {
      abortEarly: false,
    })
  } catch (errors) {
    return handleError(errors)
  }
}

export const validateImageUpload = (file: FileType) => {
  if (file && !file.mimetype.includes('image')) {
    return generateResponse({
      message: 'Only image is allowed to upload',
      status: 422,
    })
  }

  return true
}
