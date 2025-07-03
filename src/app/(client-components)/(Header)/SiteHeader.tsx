'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'
import { useThemeMode } from '@/utils/useThemeMode'
import Logo from '@/shared/Logo'
// import LangDropdown from './LangDropdown'
import AvatarDropdown from './AvatarDropdown'
import DropdownPages from './DropdownPages'
import DropdownCategories from './DropdownCategories'
import SwitchDarkMode from '@/shared/SwitchDarkMode'
import ButtonPrimary from '@/shared/ButtonPrimary'
import HeroSearchForm2Mobile from '../(HeroSearchForm2Mobile)/HeroSearchForm2Mobile'
import { useAppContext } from '@/contexts/app'
import { useLocation } from 'react-use'

const OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
}
let OBSERVER: IntersectionObserver | null = null
const PAGES_HIDE_HEADER_BORDER: string[] = ['/tours/detail']

const SiteHeader = () => {
  const pathname = usePathname()
  const location = useLocation()
  const { userInfo } = useAppContext()
  const anchorRef = useRef<HTMLDivElement>(null)

  const [isTopOfPage, setIsTopOfPage] = useState(true)

  useEffect(() => {
    setIsTopOfPage(window.scrollY < 5)
  }, [])

  useThemeMode()

  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      setIsTopOfPage(entry.isIntersecting)
    })
  }

  useEffect(() => {
    // disconnect the observer
    // observer for show the LINE bellow header
    if (!PAGES_HIDE_HEADER_BORDER.includes(pathname as Route)) {
      OBSERVER && OBSERVER.disconnect()
      OBSERVER = null
      return
    }
    if (!OBSERVER) {
      OBSERVER = new IntersectionObserver(intersectionCallback, OPTIONS)
      anchorRef.current && OBSERVER.observe(anchorRef.current)
    }
  }, [pathname])

  const renderHeader = () => {
    let headerClassName = 'shadow-sm dark:border-b dark:border-neutral-700'
    if (PAGES_HIDE_HEADER_BORDER.includes(pathname as Route)) {
      headerClassName = isTopOfPage
        ? ''
        : 'shadow-sm dark:border-b dark:border-neutral-700'
    }
    return (
      <div
        className={`hidden lg:block nc-Header sticky top-0 w-full left-0 right-0 z-40 nc-header-bg ${headerClassName}`}
      >
        <div className={`MainNav2 relative z-10`}>
          <div className="px-4 h-20 lg:container flex justify-between">
            <div className="hidden md:flex justify-start flex-1 space-x-3 sm:space-x-8 lg:space-x-10">
              <Logo className="lg:flex w-24 self-center" />

              <div className="hidden lg:block self-center h-10 border-l border-neutral-300 dark:border-neutral-500"></div>

              <div className="hidden lg:flex ">
                <DropdownPages />
              </div>
              <div className="hidden lg:flex ">
                <DropdownCategories />
              </div>
            </div>

            <div className="self-center lg:hidden flex-[3] max-w-lg !mx-auto md:px-3">
              <HeroSearchForm2Mobile />
            </div>

            <div className="hidden md:flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100 gap-4">
              <div className="hidden lg:flex space-x-4">
                <SwitchDarkMode />
                {/* <LangDropdown /> */}
                {userInfo.email && <AvatarDropdown />}
              </div>

              {!userInfo.email && (
                <ButtonPrimary
                  className="self-center"
                  href={
                    (location.pathname === '/login'
                      ? `${location.pathname}${location.search}`
                      : `/login?redirect=${encodeURIComponent(
                          `${location.pathname}${location.search}`
                        )}`) as Route
                  }
                >
                  Login
                </ButtonPrimary>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {renderHeader()}
      <div ref={anchorRef} className="h-1 absolute invisible"></div>
    </>
  )
}

export default memo(SiteHeader)
