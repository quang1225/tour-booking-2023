'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import SectionHeading from '../(components)/SectionHeading'

import {
  ListContainer,
  ListItem,
  ListRow,
  LoaderRef,
} from '../(components)/List'
import { OrderDetailModal } from '../(components)/Modals'
import { GET_ORDERS_COUNT_QUERY, GET_ORDER_QUERY } from '@/queries/order'
import { Order } from '@/queries/types'
import { useQuery } from '@apollo/client'
import PaginationAdmin from '../(components)/Form/PaginationAdmin'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from '@mui/material'
const PAGE_SIZE = 7
const OrdersAdminPage = () => {
  const loader = useRef<LoaderRef>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const {
    data: orderData,
    loading: loadingOrders,
    refetch: refeshOrders,
  } = useQuery(GET_ORDER_QUERY, {
    variables: {
      take: PAGE_SIZE,
      skip: (currentPage - 1) * PAGE_SIZE,
    },
  })
  const orders = (orderData?.orders || []) as Order[]
  const [showOrderDetailModal, setShowOrderDetailModal] = useState<{
    visible: boolean
    data: any
  }>({
    visible: false,
    data: null,
  })
  const {
    data: countOrder,
    loading: loadingCount,
    refetch: refeshCount,
  } = useQuery(GET_ORDERS_COUNT_QUERY)

  const countTotal = countOrder?.aggregateOrder._count?.id || 0
  const lastPage = Math.round(countTotal / PAGE_SIZE) + 1
  //const { createObserver } = useIntersection();

  const showOrderDetails = (orderId: string) => {
    setShowOrderDetailModal({
      visible: true,
      data: orders.find((x) => x.id === orderId),
    })
  }

  const hideOrderDetails = useCallback(() => {
    setShowOrderDetailModal({ visible: false, data: null })
  }, [])

  // useEffect(() => {
  //   getOrders();
  // }, [getOrders]);

  // useEffect(() => {
  //   let observer: IntersectionObserver;
  //   if (loader.current) {
  //     observer = createObserver(loader, () => {
  //       if (orders.nextPage) {
  //         getOrders();
  //       }
  //     });
  //   }
  //   return () => {
  //     if (observer) {
  //       observer.disconnect();
  //     }
  //   };
  // }, [createObserver, getOrders, orders]);

  //const ordersData = Object.values(orders.data);

  return (
    <>
      <div className="">
        <SectionHeading title={`Đơn đặt tour (${countTotal})`} />
        <div className="w-full h-full overflow-auto px-2 py-1">
          <ListContainer
            className="mw-1024 tableMaxHeight"
            isLoading={loadingOrders}
            message={orders.length === 0 ? 'No orders available.' : null}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    {' '}
                    <b>ID</b>
                  </TableCell>
                  <TableCell>
                    {' '}
                    <b>Người Đặt</b>
                  </TableCell>
                  <TableCell>
                    <b>Tên Tour</b>
                  </TableCell>
                  <TableCell>
                    <b>Giá Tiền</b>
                  </TableCell>
                  <TableCell>
                    <b>Phương thức thanh toán</b>
                  </TableCell>
                  <TableCell>
                    <b>Trạng Thái</b>
                  </TableCell>
                  <TableCell>
                    <b>Transaction ID</b>
                  </TableCell>
                  <TableCell>
                    <b>Ngày Đặt</b>
                  </TableCell>
                  <TableCell>
                    <b>#</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.user.fullname}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.user.fullname}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.tour.name}
                    </TableCell>
                    <TableCell>{`$${
                      order.adultPrice * order.numberOfAdults +
                      order.numberOfChilds * order.childPrice +
                      order.numberOfInfants * order.infantPrice
                    }`}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>
                      {' '}
                      {order?.status == 'PAID' ? (
                        <Chip label="PAID" color="success" />
                      ) : (
                        <Chip label="Not" color="error" />
                      )}{' '}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {order.transactionId}
                    </TableCell>
                    <TableCell>
                      {' '}
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                            }
                          )
                        : ''}
                    </TableCell>
                    <TableCell align="right">
                      {' '}
                      <ListItem
                        type="action"
                        text="View"
                        index={order.id}
                        className="w-20"
                        childClasses="radius-30"
                        onAction={showOrderDetails}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ListContainer>
        </div>
      </div>
      <PaginationAdmin
        currentPage={currentPage}
        lastPage={lastPage}
        maxLength={7}
        setCurrentPage={setCurrentPage}
      />
      <OrderDetailModal
        selectedOrder={showOrderDetailModal.data}
        visible={showOrderDetailModal.visible}
        onClose={hideOrderDetails}
      />
    </>
  )
}

export default OrdersAdminPage
