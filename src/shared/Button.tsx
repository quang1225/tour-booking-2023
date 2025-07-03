'use client'

import SpinnerIcon from '@/app/(client-components)/SpinnerIcon'
import type { Route } from 'next'
import Link from 'next/link'
import React, { ButtonHTMLAttributes, FC } from 'react'

export interface ButtonProps {
  className?: string
  translate?: string
  sizeClass?: string
  fontSize?: string
  //
  loading?: boolean
  disabled?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  href?: Route<string>
  targetBlank?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

const Button: FC<ButtonProps> = ({
  className = 'text-neutral-700 dark:text-neutral-200',
  translate = '',
  sizeClass = 'px-4 py-3 sm:px-6',
  fontSize = 'text-sm sm:text-base font-medium',
  disabled = false,
  href,
  children,
  targetBlank,
  type,
  loading,
  onClick,
}) => {
  const CLASSES = `nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors ${fontSize} ${sizeClass} ${translate} ${className} `

  if (href) {
    return (
      <Link
        href={href}
        target={targetBlank ? '_blank' : undefined}
        className={`${CLASSES} `}
        onClick={onClick}
        rel={targetBlank ? 'noopener noreferrer' : undefined}
      >
        {children || `This is Link`}
      </Link>
    )
  }

  return (
    <button
      disabled={disabled || loading}
      className={`${CLASSES}`}
      onClick={onClick}
      type={type}
    >
      {loading && (
        <span className="mr-3">
          <SpinnerIcon />
        </span>
      )}
      {children || `This is Button`}
    </button>
  )
}

export default Button
