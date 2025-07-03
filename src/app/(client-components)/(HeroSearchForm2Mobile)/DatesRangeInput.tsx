'use client'

import React, { FC } from 'react'
import CommonDatePicker from '../CommonDatePicker'

export interface StayDatesRangeInputProps {
  className?: string
}

const DatesRangeInput: FC<StayDatesRangeInputProps> = ({ className = '' }) => {
  return (
    <div>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">{` When's your trip?`}</span>
      </div>
      <div
        className={`relative flex-shrink-0 flex justify-center z-10 py-5 ${className} `}
      >
        <CommonDatePicker />
      </div>
    </div>
  )
}

export default DatesRangeInput
