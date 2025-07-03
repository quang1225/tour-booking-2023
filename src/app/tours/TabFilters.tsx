'use client'

import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonThird from '@/shared/ButtonThird'
import ButtonClose from '@/shared/ButtonClose'
import Checkbox from '@/shared/Checkbox'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Slider from 'rc-slider'
import { Category } from '@/queries/types'
import CommonSpinner from '@/components/common/CommonSpinner'
import useGetCategories from '@/hooks/api/tour/useGetCategories'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Route } from 'next'
import { SORT_ENUM } from '@/hooks/api/tour/useGetTours'

const DEFAUT_MIN_PRICE = 0
const DEFAUT_MAX_PRICE = 2000

const TabFilters = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchText = searchParams.get('searchText') || undefined
  const filteredCategoriesParam = searchParams.get('categories')
  const filteredCategories =
    filteredCategoriesParam?.split(',').map((x) => Number(x)) || undefined
  const minPrice = Number(searchParams.get('minPrice')) || undefined
  const maxPrice = Number(searchParams.get('maxPrice')) || undefined
  const sort = searchParams.get('sort') || 'newest'

  const isFilterNotNull = !!(
    searchText ||
    filteredCategories?.length ||
    maxPrice ||
    minPrice
  )

  const filterCount =
    (searchText ? 1 : 0) +
    (!!filteredCategories?.length ? 1 : 0) +
    (!!(minPrice || maxPrice) ? 1 : 0)

  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false)

  const [rangePrices, setRangePrices] = useState([
    DEFAUT_MIN_PRICE,
    DEFAUT_MAX_PRICE,
  ])
  const [filteredCategoriesState, setFilteredCategoriesState] = useState<
    number[]
  >([])

  const { categories, loadingGetCategories } = useGetCategories()

  const closeModalMoreFilter = () => setisOpenMoreFilter(false)
  const openModalMoreFilter = () => setisOpenMoreFilter(true)

  const categoryCheckboxChange = (checked: boolean, categoryId: number) => {
    if (checked) {
      setFilteredCategoriesState((prev) => [...prev, categoryId])
    } else {
      setFilteredCategoriesState((prev) =>
        prev.filter((id) => id !== categoryId)
      )
    }
  }

  const routePushParams = (params: URLSearchParams) => {
    router.push(`${pathname}?${params.toString()}` as Route, { scroll: false })
  }

  const onApplyCategoriesFilter = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('categories', filteredCategoriesState.join(','))

    if (!filteredCategoriesState.length) {
      params.delete('categories')
    }
    routePushParams(params)
  }

  const onApplyPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('minPrice', `${rangePrices[0]}`)
    params.set('maxPrice', `${rangePrices[1]}`)

    if (!rangePrices[0]) {
      params.delete('minPrice')
    }
    routePushParams(params)
  }

  const onApplySort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)

    if (value === 'newest') {
      params.delete('minPrice')
    }
    routePushParams(params)
  }

  const resetCategoriesFilter = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('categories')
    routePushParams(params)
  }

  const resetPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('minPrice')
    params.delete('maxPrice')
    routePushParams(params)
  }

  const resetSearchTextFilter = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('searchText')
    routePushParams(params)
  }

  const onApplyAllFilter = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('categories', filteredCategoriesState.join(','))
    params.set('minPrice', `${rangePrices[0]}`)
    params.set('maxPrice', `${rangePrices[1]}`)

    if (!filteredCategoriesState.length) {
      params.delete('categories')
    }
    if (!rangePrices[0]) {
      params.delete('minPrice')
    }
    if (rangePrices[1] >= DEFAUT_MAX_PRICE) {
      params.delete('maxPrice')
    }
    routePushParams(params)
  }

  const resetAllFilter = () => {
    router.push(`/tours`)
  }

  useEffect(() => {
    setRangePrices([minPrice || DEFAUT_MIN_PRICE, maxPrice || DEFAUT_MAX_PRICE])
  }, [minPrice, maxPrice])

  useEffect(() => {
    setFilteredCategoriesState(filteredCategories || [])
  }, [filteredCategoriesParam])

  const renderXClear = () => {
    return (
      <span className="w-4 h-4 p-0.5 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    )
  }

  const renderTabsSort = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-3 py-2 sm:px-4 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${
                open ? '!border-primary-500 ' : ''
              } border-primary-500 bg-primary-50 text-primary-700`}
            >
              <span>{SORT_ENUM.find((x) => x.value === sort)?.label}</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className="absolute z-10 w-screen px-4 mt-3 right-0 sm:px-0"
                style={{ maxWidth: 'max-content' }}
              >
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col">
                    {SORT_ENUM.map((item) => {
                      return (
                        <div
                          key={item.label}
                          className={`flex items-center px-5 py-3 hover:cursor-pointer transition duration-150 ease-in-out rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
                            item.value === sort
                              ? 'bg-neutral-100 dark:bg-neutral-700'
                              : ''
                          }`}
                          onClick={() => {
                            onApplySort(item.value)
                            close()
                          }}
                        >
                          {item.label}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    )
  }

  const renderTabsTypeOfPlace = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-3 py-2 sm:px-4 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${
                open ? '!border-primary-500 ' : ''
              } ${
                filteredCategories?.length
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-neutral-300 dark:border-neutral-700'
              }`}
            >
              <span>
                {categories
                  ?.filter((x) => filteredCategories?.includes(x.id))
                  .map((y) => y.name)
                  .join(', ') || 'Categories'}
              </span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {loadingGetCategories && <CommonSpinner />}

                    {!loadingGetCategories &&
                      categories.map((item) => {
                        if (!item.name) return <></>
                        return (
                          <Checkbox
                            key={item.id}
                            name={item.name}
                            label={item.name}
                            defaultChecked={filteredCategories?.includes(
                              item.id
                            )}
                            checked={filteredCategoriesState?.includes(item.id)}
                            onChange={(checked) =>
                              categoryCheckboxChange(checked, item.id)
                            }
                          />
                        )
                      })}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        resetCategoriesFilter()
                        close()
                      }}
                      sizeClass="px-3 py-2 sm:px-4"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        onApplyCategoriesFilter()
                        close()
                      }}
                      sizeClass="px-3 py-2 sm:px-4"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    )
  }

  const renderTabsPriceRage = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-3 py-2 sm:px-4 text-sm rounded-full border focus:outline-none cursor-pointer transition-all ${
                minPrice || maxPrice
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-neutral-300 dark:border-neutral-700'
              }`}
            >
              {!maxPrice && <>Price range</>}

              {maxPrice && (
                <>
                  <span>
                    {`$${convertNumbThousand(
                      minPrice || 0
                    )} - $${convertNumbThousand(maxPrice)}`}{' '}
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      resetPriceFilter()
                    }}
                  >
                    {renderXClear()}
                  </span>
                </>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <span className="font-medium">Price per day</span>
                      <Slider
                        range
                        min={DEFAUT_MIN_PRICE}
                        max={DEFAUT_MAX_PRICE}
                        defaultValue={[rangePrices[0], rangePrices[1]]}
                        allowCross={false}
                        onChange={(e) => setRangePrices(e as number[])}
                      />
                    </div>

                    <div className="flex justify-between space-x-5">
                      <div>
                        <label
                          htmlFor="minPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Min price
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              $
                            </span>
                          </div>
                          <input
                            type="text"
                            name="minPrice"
                            disabled
                            id="minPrice"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                            value={rangePrices[0]}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="maxPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Max price
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              $
                            </span>
                          </div>
                          <input
                            type="text"
                            disabled
                            name="maxPrice"
                            id="maxPrice"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                            value={rangePrices[1]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        resetPriceFilter()
                        close()
                      }}
                      sizeClass="px-3 py-2 sm:px-4"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        onApplyPriceFilter()
                        close()
                      }}
                      sizeClass="px-3 py-2 sm:px-4"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    )
  }

  const renderSearchText = () => {
    if (!searchText) return <></>

    return (
      <div
        className={`flex items-center justify-center px-3 py-2 sm:px-4 text-sm rounded-full border focus:outline-none cursor-pointer transition-all ${
          searchText
            ? 'border-primary-500 bg-primary-50 text-primary-700'
            : 'border-neutral-300 dark:border-neutral-700'
        }`}
      >
        <span>{searchText}</span>

        <span
          onClick={(e) => {
            e.stopPropagation()
            resetSearchTextFilter()
          }}
        >
          {renderXClear()}
        </span>
      </div>
    )
  }

  const renderMoreFilterItem = (data: Category[]) => {
    return (
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-5">
          {loadingGetCategories && <CommonSpinner />}
          {!loadingGetCategories &&
            data.map((item) => {
              if (!item.name) return <></>
              return (
                <Checkbox
                  key={item.id}
                  name={item.name}
                  label={item.name}
                  defaultChecked={filteredCategories?.includes(item.id)}
                  checked={filteredCategoriesState?.includes(item.id)}
                  onChange={(checked) =>
                    categoryCheckboxChange(checked, item.id)
                  }
                />
              )
            })}
        </div>
      </div>
    )
  }

  const renderTabMobileFilter = () => {
    return (
      <div>
        <div
          className={`flex items-center justify-center px-3 py-2 sm:px-4 text-sm rounded-full border focus:outline-none cursor-pointer ${
            isFilterNotNull
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-neutral-300 dark:border-neutral-700'
          }`}
          onClick={openModalMoreFilter}
        >
          Filters {isFilterNotNull ? <>({filterCount})</> : <></>}
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilter}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                className="inline-block py-8 px-2 h-screen w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3 className="text-xl">Filters</h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-4 sm:px-6 divide-y divide-neutral-200 dark:divide-neutral-800">
                      {searchText && (
                        <div className="py-7">
                          <h3 className="text-xl font-medium">
                            Search tour name
                          </h3>
                          <div className="mt-6 relative break-words">
                            {searchText}
                          </div>
                        </div>
                      )}

                      <div className="py-7">
                        <h3 className="text-xl font-medium">Categories</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(categories)}
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Price range</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-8">
                            <div className="space-y-5">
                              <Slider
                                range
                                min={DEFAUT_MIN_PRICE}
                                max={DEFAUT_MAX_PRICE}
                                defaultValue={[rangePrices[0], rangePrices[1]]}
                                allowCross={false}
                                onChange={(e) => setRangePrices(e as number[])}
                              />
                            </div>

                            <div className="flex justify-between space-x-5">
                              <div>
                                <label
                                  htmlFor="minPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Min price
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    name="minPrice"
                                    id="minPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={rangePrices[0]}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="maxPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Max price
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    name="maxPrice"
                                    id="maxPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={rangePrices[1]}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        closeModalMoreFilter()
                        resetAllFilter()
                      }}
                      sizeClass="px-3 py-2 sm:px-4"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        closeModalMoreFilter()
                        onApplyAllFilter()
                      }}
                      sizeClass="px-3 py-2 sm:px-4"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between lg:space-x-4 flex-wrap gap-3">
      <div className="flex gap-3">
        <div className="hidden lg:flex space-x-4">
          {renderTabsTypeOfPlace()}
          {renderTabsPriceRage()}
          {renderSearchText()}
        </div>

        <div className="flex lg:hidden space-x-4">
          {renderTabMobileFilter()}
        </div>

        {isFilterNotNull && (
          <ButtonThird onClick={resetAllFilter} sizeClass="px-3 py-2 sm:px-4">
            <span className="hidden lg:block text-sm">Clear filters</span>
            <span className="lg:hidden text-sm">Clear all</span>
          </ButtonThird>
        )}
      </div>

      {renderTabsSort()}
    </div>
  )
}

export default TabFilters
