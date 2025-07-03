'use client'

import React, { useCallback, useEffect, useState } from 'react'
import {
  ShoppingBasketOutlined,
  ShoppingCartOutlined,
  SupervisorAccountOutlined,
} from '@mui/icons-material'
import DashboardCard from './(components)/DashboardCard'
import { ListContainer, ListItem, ListRow } from './(components)/List'
//import { OrderDetailModal } from "./(components)/Modals";
import { Order, Tour, User } from '@/queries/types'
import { GET_ORDER_QUERY } from '@/queries/order'
import { useQuery } from '@apollo/client'
import { GET_TOTALMONEYFROMDATE_QUERY, GET_TOURS_QUERY } from '@/queries/tour'
import { GET_USER_QUERY } from '@/queries/user'
//import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import withAuth from "../../hoc/withAuth";

const Index = () => {
  const {
    data: orderData,
    loading: loadingOrders,
    refetch: refeshOrders,
  } = useQuery(GET_ORDER_QUERY)
  const orders = (orderData?.orders || []) as Order[]
  const {
    data: tourData,
    loading: loadingTour,
    refetch: refeshTour,
  } = useQuery(GET_TOURS_QUERY)
  const tours = (tourData?.tours || []) as Tour[]

  const {
    data: userData,
    loading: loadingUser,
    refetch: refeshUserList,
  } = useQuery(GET_USER_QUERY)
  const users = (userData?.users || []) as User[]

  const { data: totalData, loading: loadingTotal } = useQuery(
    GET_TOTALMONEYFROMDATE_QUERY,
    {
      variables: {
        where: {
          createdAt: {
            lte: null,
            gte: null,
          },
        },
      },
    }
  )

  useEffect(() => {
    refeshOrders()
    refeshTour()
    refeshUserList()
  }, [])

  return (
    <>
      <ListContainer
        className="relative mw-1024 tableMaxHeight"
        isLoading={loadingTour}
        message={''}
      >
        <div className="">
          <h3>
            <b>Chào mừng bạn đến với trang quản lý</b>
          </h3>
        </div>

        {/* <DateRangePicker localeText={{ start: 'DateFrom', end: 'DateTo' }} />  */}
        <div className="flex flex-row  mb-16 smMax:flex-col xlMax:justify-between">
          <DashboardCard
            Icon={SupervisorAccountOutlined}
            title="Users"
            count={users.length}
            className="smMax:mb-4"
          />
          <DashboardCard
            Icon={ShoppingBasketOutlined}
            title="Tours"
            count={tours.length}
            className="smMax:mb-4"
          />
          <DashboardCard
            Icon={ShoppingCartOutlined}
            title="Orders"
            count={orders.length}
            className="smMax:mb-4"
          />
        </div>
      </ListContainer>
    </>
  )
}

export default Index
