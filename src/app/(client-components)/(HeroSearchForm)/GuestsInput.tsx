'use client'

import React, { Fragment, FC, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import NcInputNumber from '@/components/NcInputNumber'
import { UserPlusIcon } from '@heroicons/react/24/outline'
import ClearDataButton from '@/app/(client-components)/(HeroSearchForm)/ClearDataButton'
import { GuestsObject } from '@/app/(client-components)/type'
import { INIT_GUESTS_INPUT, useAppContext } from '@/contexts/app'
import ButtonSubmit from './ButtonSubmit'
import { useRouter } from 'next/navigation'

export interface GuestsInputProps {
  className?: string
  hasButtonSubmit?: boolean
  searchTextValue?: string
}

const GuestsInput: FC<GuestsInputProps> = ({
  className = 'flex-1',
  hasButtonSubmit,
  searchTextValue,
}) => {
  const router = useRouter()
  const { userInput, setUserInput } = useAppContext()
  const {
    numberOfAdults = 0,
    numberOfChilds = 0,
    numberOfInfants = 0,
  } = userInput

  const totalGuests = numberOfAdults + numberOfChilds + numberOfInfants

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

  const onClickSearch = () => {
    router.push(`/tours?searchText=${searchTextValue}`)
  }

  return (
    <Popover className={`flex relative ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex-1 flex items-center focus:outline-none rounded-b-3xl ${
              open ? 'shadow-lg' : ''
            }`}
          >
            <Popover.Button
              className={`relative z-10 flex-1 flex text-left items-center p-3 space-x-3 focus:outline-none`}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                <span className="block xl:text-lg font-semibold">
                  {totalGuests || ''} Guests
                </span>
                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                  {totalGuests ? 'Guests' : 'Add guests'}
                </span>
              </div>

              {!!totalGuests && open && (
                <ClearDataButton
                  onClick={() => {
                    setUserInput({ ...INIT_GUESTS_INPUT })
                  }}
                />
              )}
            </Popover.Button>

            {/* BUTTON SUBMIT OF FORM */}
            {hasButtonSubmit && (
              <div className="pr-2 xl:pr-4" onClick={onClickSearch}>
                <ButtonSubmit />
              </div>
            )}
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black ring-opacity-5 ">
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
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default GuestsInput
