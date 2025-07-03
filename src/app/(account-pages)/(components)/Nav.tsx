'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const Nav = () => {
  const pathname = usePathname()

  const listNav: { route: Route; title: string }[] = [
    { route: '/account', title: 'Account' },
    { route: '/account/saved-list', title: 'Saved list' },
    { route: '/account/bookings', title: 'My bookings' },
  ]

  return (
    <div className="container">
      <div className="flex justify-center md:justify-start space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
        {listNav.map((item) => {
          const isActive = pathname === item.route
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`block py-5 md:py-8 border-b-2 flex-shrink-0 capitalize ${
                isActive
                  ? 'border-primary-500 font-medium'
                  : 'border-transparent'
              }`}
            >
              {item.title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
