'use client'

import React from 'react'
import NcInputNumber from '@/components/NcInputNumber'
import { FC } from 'react'
import { GuestsObject } from '../type'
import { useAppContext } from '@/contexts/app'

export interface GuestsInputProps {
  defaultValue?: GuestsObject
  onChange?: (data: GuestsObject) => void
  className?: string
}

const GuestsInputMobile: FC<GuestsInputProps> = ({
  defaultValue,
  onChange,
  className = '',
}) => {
  const { userInput, setUserInput } = useAppContext()
  const {
    numberOfAdults = 0,
    numberOfChilds = 0,
    numberOfInfants = 0,
  } = userInput

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    if (type === 'guestAdults') {
      setUserInput({ numberOfAdults: value })
    }
    if (type === 'guestChildren') {
      setUserInput({ numberOfChilds: value })
    }
    if (type === 'guestInfants') {
      setUserInput({ numberOfInfants: value })
    }
  }

  return (
    <div className={`flex flex-col relative p-5 flex-1 ${className}`}>
      <span className="mb-5 block font-semibold text-xl sm:text-2xl">{`Who's coming?`}</span>
      <NcInputNumber
        className="w-full"
        defaultValue={numberOfAdults}
        onChange={(value) => handleChangeData(value, 'guestAdults')}
        max={10}
        min={1}
        label="Adults"
        desc="Ages 13 or above"
      />
      <NcInputNumber
        className="w-full mt-6"
        defaultValue={numberOfChilds}
        onChange={(value) => handleChangeData(value, 'guestChildren')}
        max={4}
        label="Children"
        desc="Ages 2–12"
      />

      <NcInputNumber
        className="w-full mt-6"
        defaultValue={numberOfInfants}
        onChange={(value) => handleChangeData(value, 'guestInfants')}
        max={4}
        label="Infants"
        desc="Ages 0–2"
      />
    </div>
  )
}

export default GuestsInputMobile
