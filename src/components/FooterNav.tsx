'use client'

import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import React, { useEffect, useRef, useState } from 'react'
import MenuBar from '@/shared/MenuBar'
import isInViewport from '@/utils/isInViewport'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Route } from 'next'
import { useAppContext } from '@/contexts/app'
import { useLocation } from 'react-use'

let WIN_PREV_POSITION = 0
if (typeof window !== 'undefined') {
  WIN_PREV_POSITION = window.scrollY
}

interface NavItem {
  name: string
  link: Route
  icon: typeof HomeIcon
}

const FooterNav = () => {
  const { userInfo } = useAppContext()
  const location = useLocation()
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisableMenu, setIsVisableMenu] = useState(false)

  const isTourDetailPage = pathname.includes('/tours/')

  const NAV_MENU: NavItem[] = [
    {
      name: 'Home',
      link: '/',
      icon: HomeIcon,
    },
    {
      name: 'All tours',
      link: '/tours',
      icon: MagnifyingGlassIcon,
    },
    {
      name: userInfo.email ? userInfo.email?.split('@')[0] : 'Log in',
      link: userInfo.email
        ? '/account'
        : `/login?redirect=${encodeURIComponent(
            `${location.pathname}${location.search}`
          )}`,
      icon: UserCircleIcon,
    },
  ]

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleEvent)
    }
  }, [])

  const handleEvent = () => {
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(showHideHeaderMenu)
    }
  }

  const showHideHeaderMenu = () => {
    const currentScrollPos = window.scrollY
    if (!containerRef.current) return

    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return
      }

      containerRef.current.classList.add('FooterNav--hide')
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return
      }
      containerRef.current.classList.remove('FooterNav--hide')
    }

    WIN_PREV_POSITION = currentScrollPos
  }

  const renderItem = (item: NavItem, index: number) => {
    const isActive = pathname === item.link

    return (
      <Link
        key={index}
        href={item.link}
        className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
          isActive ? 'text-neutral-900 dark:text-neutral-100' : ''
        }`}
      >
        <item.icon className={`w-6 h-6 ${isActive ? 'text-red-600' : ''}`} />
        <span
          className={`text-[11px] leading-none mt-1 ${
            isActive ? 'text-red-600' : ''
          }`}
        >
          {item.name}
        </span>
      </Link>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{ bottom: isTourDetailPage ? 72 : 0 }}
      className="FooterNav block md:!hidden p-2 bg-white dark:bg-neutral-800 fixed top-auto bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700 
      transition-transform duration-300 ease-in-out"
    >
      <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center ">
        {NAV_MENU.map(renderItem)}

        <div
          className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90`}
          onClick={() => setIsVisableMenu(true)}
        >
          <MenuBar
            iconClassName="w-6 h-6"
            className={``}
            isVisable={isVisableMenu}
            setIsVisable={setIsVisableMenu}
          />
          <span className="text-[11px] leading-none mt-1">Menu</span>
        </div>
      </div>
    </div>
  )
}

export default FooterNav
