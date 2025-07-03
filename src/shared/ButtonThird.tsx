import Button, { ButtonProps } from './Button'
import React from 'react'

export type ButtonThirdProps = ButtonProps

const ButtonThird: React.FC<ButtonThirdProps> = ({
  className = '',
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonThird text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700 ${className}`}
      {...args}
    />
  )
}

export default ButtonThird
