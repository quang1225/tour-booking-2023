'use client'

import React from 'react'
import ButtonClose from '@/shared/ButtonClose'
import Logo from '@/shared/Logo'
import { Disclosure } from '@headlessui/react'
import { NavItemType } from './NavigationItem'
import ButtonPrimary from '@/shared/ButtonPrimary'
// import SocialsList from '@/shared/SocialsList'
import { ChevronDownIcon, MapPinIcon } from '@heroicons/react/24/solid'
import SwitchDarkMode from '@/shared/SwitchDarkMode'
import Link from 'next/link'
import { useAppContext } from '@/contexts/app'
import useMutateLogout from '@/hooks/api/user/useMutateLogout'
import useGetCategories from '@/hooks/api/tour/useGetCategories'
import { Route } from 'next'
import { useRouter } from 'next/navigation'

export interface NavMobileProps {
  data?: NavItemType[]
  onClickClose: () => void
}

const NavMobile: React.FC<NavMobileProps> = ({ data, onClickClose }) => {
  const { userInfo } = useAppContext()
  const router = useRouter()
  const { logout, loadingLogout } = useMutateLogout()
  const { categories, loadingGetCategories } = useGetCategories()

  const navMenu: NavItemType[] = [
    {
      id: 'home',
      href: '/',
      name: 'Home',
    },
    {
      id: 'all-tours',
      href: '/tours',
      name: 'All tours',
    },
    {
      id: 'categories',
      name: 'Categories',
      type: 'dropdown',
      children: categories.map((cate) => ({
        id: `category_${cate.id}`,
        href: `/tours?categories=${cate.id}`,
        name: (
          <span className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4" /> {cate.name}
          </span>
        ),
      })),
    },
  ]

  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href || '' + index} as="li">
            <div
              onClick={() => {
                onClickClose()
                router.push((i.href || '') as Route)
              }}
              className="flex px-4 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5"
            >
              <span
                className={`py-2.5 pr-3 ${!i.children ? 'block w-full' : ''}`}
              >
                {i.name}
              </span>
              {i.children && (
                <span className="flex-1 flex">
                  <Disclosure.Button
                    as="span"
                    className="py-2.5 flex justify-end flex-1"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </div>
            {i.children && (
              <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    )
  }

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <Link
          className="flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          href={{
            pathname: item.href || undefined,
          }}
        >
          <span
            className={`py-2.5 pr-3 ${!item.children ? 'block w-full' : ''}`}
          >
            {item.name}
          </span>
          {item.children && (
            <span className="flex-1 flex" onClick={(e) => e.preventDefault()}>
              <Disclosure.Button
                as="span"
                className="py-2.5 flex items-center justify-end flex-1 "
              >
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </Link>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    )
  }

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5 flex">
        <Logo />
        <span className="block ml-6">
          <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
        </span>
        {/* <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <span>Contact us by following channel:</span>

          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
            <span className="block">
              <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
            </span>
          </div>
        </div> */}
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        {navMenu.map(_renderItem)}
      </ul>
      <div className="flex items-center justify-between py-6 px-5">
        
        <div className="inline-block">
          {userInfo.email && (
            <ButtonPrimary
              loading={loadingLogout}
              onClick={async () => {
                await logout()
                onClickClose?.()
              }}
            >
              Logout
            </ButtonPrimary>
          )}
        </div>

        {/* <LangDropdown
          className="flex"
          panelClassName="z-10 w-screen max-w-[280px] px-4 mb-3 right-3 top-full sm:px-0"
        /> */}
      </div>
    </div>
  )
}

export default NavMobile
