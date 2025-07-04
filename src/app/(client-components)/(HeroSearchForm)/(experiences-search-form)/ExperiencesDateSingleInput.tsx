'use client'

import React, { Fragment } from 'react'
import { FC } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import ClearDataButton from '../ClearDataButton'
import CommonDatePicker from '../../CommonDatePicker'
import { useAppContext } from '@/contexts/app'

export interface ExperiencesDateSingleInputProps {
  className?: string
  fieldClassName?: string
}

const ExperiencesDateSingleInput: FC<ExperiencesDateSingleInputProps> = ({
  className = '',
  fieldClassName = '[ nc-hero-field-padding ]',
}) => {
  const { userInput, setUserInput } = useAppContext()
  const { startDate } = userInput

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {startDate?.toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
            }) || 'Start date'}
            {/* {endDate
              ? ' - ' +
                endDate?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                })
              : ''} */}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {startDate ? 'Start date' : `Select date`}
          </span>
        </div>
      </>
    )
  }

  return (
    <>
      <Popover
        className={`ExperiencesDateSingleInput relative flex ${className}`}
      >
        {({ open }) => (
          <>
            <Popover.Button
              className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none ${
                open ? 'nc-hero-field-focused' : ''
              }`}
            >
              {renderInput()}
              {/* {startDate && open && <ClearDataButton onClick={() => onChangeDate([null, null])} />} */}
              {startDate && open && (
                <ClearDataButton
                  onClick={() => setUserInput({ startDate: undefined })}
                />
              )}
            </Popover.Button>

            {open && (
              <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -inset-x-0.5 bg-white dark:bg-neutral-800"></div>
            )}

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-40 mt-3 top-full w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                  <CommonDatePicker />
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}

export default ExperiencesDateSingleInput
