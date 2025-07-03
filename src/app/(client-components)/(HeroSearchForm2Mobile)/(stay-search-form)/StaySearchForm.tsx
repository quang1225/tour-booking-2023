'use client'

import React, { FC, useState } from 'react'
import { GuestsObject } from '../../type'
import GuestsInput from '../GuestsInputMobile'
import LocationInput from '../LocationInput'
import DatesRangeInput from '../DatesRangeInput'
import { useAppContext } from '@/contexts/app'

interface Props {
  closeModal: () => void
}

const StaySearchForm: FC<Props> = ({ closeModal }) => {
  const [fieldNameShow, setFieldNameShow] = useState<
    'location' | 'dates' | 'guests'
  >('location')

  const [locationInputTo, setLocationInputTo] = useState('')
  const [guestInput, setGuestInput] = useState<GuestsObject>({
    guestAdults: 0,
    guestChildren: 0,
    guestInfants: 0,
  })
  const { userInput } = useAppContext()
  const {
    startDate,
    numberOfAdults = 0,
    numberOfChilds = 0,
    numberOfInfants = 0,
  } = userInput

  const totalGuests = numberOfAdults + numberOfChilds + numberOfInfants

  const renderInputLocation = () => {
    const isActive = fieldNameShow === 'location'
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 ${
          isActive
            ? 'rounded-2xl shadow-lg'
            : 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow('location')}
          >
            <span className="text-neutral-400">Where</span>
            <span>{locationInputTo || 'Location'}</span>
          </button>
        ) : (
          <LocationInput
            closeModal={closeModal}
            defaultValue={locationInputTo}
            onChange={(value) => {
              setLocationInputTo(value)
              setFieldNameShow('dates')
            }}
          />
        )}
      </div>
    )
  }

  const renderInputDates = () => {
    const isActive = fieldNameShow === 'dates'

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? 'rounded-2xl shadow-lg'
            : 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4  `}
            onClick={() => setFieldNameShow('dates')}
          >
            <span className="text-neutral-400">When</span>
            {/* <span>{startDate ? converSelectedDateToString([startDate, endDate]) : "Add date"}</span> */}
            <span>
              {startDate?.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
              }) || 'Start date'}
            </span>
          </button>
        ) : (
          <DatesRangeInput />
        )}
      </div>
    )
  }

  const renderInputGuests = () => {
    const isActive = fieldNameShow === 'guests'

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? 'rounded-2xl shadow-lg'
            : 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow('guests')}
          >
            <span className="text-neutral-400">Who</span>
            <span>{`${totalGuests || 'Add'} guests`}</span>
          </button>
        ) : (
          <GuestsInput defaultValue={guestInput} onChange={setGuestInput} />
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="w-full space-y-5">
        {/*  */}
        {renderInputLocation()}
        {/*  */}
        {renderInputDates()}
        {/*  */}
        {renderInputGuests()}
      </div>
    </div>
  )
}

export default StaySearchForm
