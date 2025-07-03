import React, { FC } from 'react'
import twFocusClass from '@/utils/twFocusClass'

export interface PaginationProps {
  currentPage: number
  onPageChange: (x: number) => void
  totalItems: number
  pageSize: number
}

const Pagination: FC<PaginationProps> = ({
  currentPage = 1,
  onPageChange,
  totalItems,
  pageSize,
}) => {
  const onPageClick = (pageNumber: number) => {
    onPageChange(pageNumber)
  }

  const renderItem = (pageNumber: number) => {
    return (
      <span
        key={pageNumber}
        onClick={() => onPageClick(pageNumber)}
        className={`cursor-pointer inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 ${twFocusClass()} ${
          pageNumber === currentPage
            ? 'text-white'
            : 'bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700'
        }`}
      >
        {pageNumber}
      </span>
    )
  }

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium`}
    >
      {Array.from(Array(Math.round(totalItems / pageSize)).keys()).map((x) =>
        renderItem(x + 1)
      )}
    </nav>
  )
}

export default Pagination
