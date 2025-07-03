import React, { FC } from 'react'
import { Nav } from './(components)/Nav'
import { Metadata } from 'next'

export interface CommonLayoutProps {
  children?: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Account',
  description: 'User Account to save favorite tour and track order history',
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className="nc-CommonLayoutAccount bg-neutral-50 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 dark:border-neutral-700 pt-2 bg-white dark:bg-neutral-800">
        <Nav />
      </div>
      <div className="container pt-14 sm:pt-12 pb-24 lg:pb-32">{children}</div>
    </div>
  )
}

export default CommonLayout
