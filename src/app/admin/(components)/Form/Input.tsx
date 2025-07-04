import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { ControllerRenderProps } from 'react-hook-form'

import Message, { MessageI } from './Message'
import Label from './Label'

interface InputI
  extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange'>,
    Pick<ControllerRenderProps, 'onChange'>,
    Omit<MessageI, 'className'> {
  type: 'email' | 'password' | 'text' | 'textarea' | 'number' | 'checkbox'
  icon?: 'price' | 'discount'
  label?: string
  id?: string
  className?: string
}

export type InputRef = HTMLInputElement
export type TextAreaRef = HTMLTextAreaElement

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<InputRef & TextAreaRef, InputI>((props, ref) => {
  const { type, label, className, message, messageType, icon, ...inputProps } =
    props
  const [showPassword, setShowPassword] = useState(false)

  const labelProps = {} as React.HTMLProps<HTMLLabelElement>
  let inputType = type

  if (inputProps.id) {
    labelProps.htmlFor = inputProps.id
  }

  if (type === 'password') {
    inputType = showPassword ? 'text' : 'password'
  }

  const togglePasswordInput = () => setShowPassword(!showPassword)
  const isError = messageType === 'error'

  return (
    <div className={`w-full mb-3.5 ${className || ''}`}>
      {label && <Label labelProps={labelProps} label={label} />}
      <div
        className={`relative w-full ${type === 'textarea' ? 'h-24' : 'h-12'}  ${
          isError ? 'border-danger' : ''
        }  rounded-2xl border border-gray`}
      >
        {type === 'textarea' ? (
          <textarea
            name={inputProps.name}
            onChange={inputProps.onChange}
            value={inputProps.value}
            ref={ref}
            className={`w-full h-full rounded-2xl p-4 ${className || ''}`}
          />
        ) : (
          <input
            {...inputProps}
            ref={ref}
            type={inputType}
            className={`w-full h-full rounded-2xl p-4 ${
              icon === 'price' ? 'pl-8' : ''
            } ${className || ''}`}
          />
        )}
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordInput}
            className="absolute top-3 right-4 w-6 h-6"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </button>
        )}
        {icon === 'price' && <span className="absolute top-3 left-4">$</span>}
        {icon === 'discount' && (
          <span className="absolute top-3 right-4">%</span>
        )}
      </div>
      {message && messageType ? (
        <Message {...{ message, messageType }} />
      ) : null}
    </div>
  )
})

export default Input
