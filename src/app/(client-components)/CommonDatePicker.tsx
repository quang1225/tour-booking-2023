'use client'

import DatePicker from 'react-datepicker'
import React, { FC } from 'react'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import { useAppContext } from '@/contexts/app'

export interface StayDatesRangeInputProps {
  className?: string
}

const DatesRangeInput: FC<StayDatesRangeInputProps> = () => {
  const { userInput, setUserInput } = useAppContext()
  const { startDate } = userInput

  const onChangeDate = (date: Date) => {
    setUserInput({ startDate: date })
  }

  // const [endDate, setEndDate] = useState<Date | null>(new Date());

  // const onChangeDate = (dates: [Date | null, Date | null]) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };

  return (
    <DatePicker
      selected={startDate}
      onChange={onChangeDate}
      startDate={startDate}
      // endDate={endDate}
      // selectsRange
      monthsShown={2}
      showPopperArrow={false}
      inline
      renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
      renderDayContents={(day, date) => (
        <DatePickerCustomDay dayOfMonth={day} date={date} />
      )}
    />
  )
}

export default DatesRangeInput
