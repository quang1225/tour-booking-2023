'use client'

import React, { ReactNode } from 'react'

const DetailLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="ListingDetailPage pt-4">
      <div className="container ListingDetailPage__content">{children}</div>

      <div className="py-24 lg:py-32" />
    </div>
  )
}

export default DetailLayout
