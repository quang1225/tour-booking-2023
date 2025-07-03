'use client'

import React from 'react'
import OrderCard from '@/components/OrderCard'
import useGetUserOrders from '@/hooks/api/user/useGetUserOrders'
import CommonSpinner from '@/components/common/CommonSpinner'
import { Order } from '@/queries/types'

const AccountSavelists = () => {
  const { userOrdersData, loadingGetUserOrders } = useGetUserOrders()
  const orders = (userOrdersData?.data || []) as Order[]

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">My bookings</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {loadingGetUserOrders && (
          <div className="mt-16">
            <CommonSpinner />
          </div>
        )}

        {!loadingGetUserOrders && (
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {orders.map((order) => (
              <OrderCard key={order.id} data={order} />
            ))}
          </div>
        )}

        {!loadingGetUserOrders && !orders.length && (
          <div className="flex justify-center">No order</div>
        )}

        {/* <div className="flex mt-11 justify-center items-center">
            <ButtonSecondary>Show me more</ButtonSecondary>
          </div> */}
      </div>
    )
  }

  return renderSection1()
}

export default AccountSavelists
