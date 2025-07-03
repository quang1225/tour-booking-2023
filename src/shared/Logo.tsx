import React from 'react'
import LogoSvg from './LogoSvg'
import Link from 'next/link'
import { Route } from 'next'

export interface LogoProps {
  className?: string
  textClassname?: string
  href?: Route
}

const Logo: React.FC<LogoProps> = ({
  className = 'w-24',
  textClassname = '',
  href = '/',
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
      <LogoSvg />

      <span
        className={`text-3xl font-medium font-bold text-neutral-700 dark:text-neutral-100 ${textClassname}`}
      >
        MIA
      </span>
    </Link>
  )
}

export default Logo
