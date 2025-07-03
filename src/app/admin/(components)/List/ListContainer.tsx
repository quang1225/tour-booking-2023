import React from 'react'
import { CircularProgress } from '@mui/material'
import CommonSpinner from '@/components/common/CommonSpinner'

interface ListContainerI {
  children: React.ReactNode
  message: string | null
  isLoading?: boolean
  className?: string
}

const ListContainer = ({
  children,
  isLoading,
  className,
  message,
}: ListContainerI) => (
  <div
    className={`w-full h-full bg-white list-row-shadow rounded ${
      className || ''
    }`}
  >
    {children}
    {isLoading && (
      <div className="w-full h-10 mt-10 flex items-center justify-center overflow-hidden">
        <CommonSpinner />
      </div>
    )}
    {!isLoading && message && (
      <p className="w-full py-5 text-lightBlackHex text-center"></p>
    )}
  </div>
)

export default ListContainer
