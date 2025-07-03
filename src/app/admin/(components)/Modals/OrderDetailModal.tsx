import React from 'react'
import SideModal from './SideModal'
import { Order } from '@/queries/types'
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
interface OrderDetailsModalI {
  selectedOrder: Order | undefined
  visible: boolean
  onClose: () => void
}

const OrderDetailModal = ({
  visible,
  selectedOrder,
  onClose,
}: OrderDetailsModalI) => {
  const {
    numberOfAdults = 0,
    numberOfChilds = 0,
    numberOfInfants = 0,
    adultPrice = 0,
    childPrice = 0,
    infantPrice = 0,
  } = selectedOrder || {}
  return (
    <SideModal visible={visible} onClose={onClose}>
      {selectedOrder === null ? null : (
        //   <>
        //     <div className="w-full mb-10 inline-block">
        //       <div className="flex justify-between items-center">
        //         <h5 className="text-2xl font-bold">Người đặt</h5>
        //         <span className="text-2xl text-success ">
        //           {selectedOrder?.user?.fullname}
        //         </span>
        //       </div>
        //     </div>
        //     <div className="w-full mb-10 inline-block">
        //       <div className="flex justify-between items-center">
        //         <h5 className="text-2xl font-bold">Tour</h5>
        //         <span className="text-2xl text-success ">
        //           {selectedOrder?.tour.name}
        //         </span>
        //       </div>
        //     </div>
        //     <div className="w-full mb-10 inline-block">
        //       <div className="flex justify-between items-center">
        //         <h5 className="text-2xl font-bold">Ngày bắt đầu</h5>
        //         <span className="text-2xl text-success ">
        //           {selectedOrder?.startDate}
        //         </span>
        //       </div>
        //     </div>
        //     <div className="w-full mb-10 inline-block">
        //       <div className="flex justify-between items-center">
        //         <h5 className="text-2xl font-bold">Người lớn</h5>
        //         <span className="text-2xl text-success ">
        //           {selectedOrder?.numberOfAdults || ''}
        //         </span>
        //       </div>
        //     </div>
        //     <div className="w-full mb-10 inline-block">
        //       <div className="flex justify-between items-center">
        //         <h5 className="text-2xl font-bold">Trẻ em</h5>
        //         <span className="text-2xl text-success ">
        //           {selectedOrder?.numberOfChilds || ''}
        //         </span>
        //       </div>
        //     </div>
        //     <div className="w-full mb-10 inline-block">
        //       <div className="flex justify-between items-center">
        //         <h5 className="text-2xl font-bold">Sơ sinh</h5>
        //         <span className="text-2xl text-success ">
        //           {selectedOrder?.numberOfInfants || ''}
        //         </span>
        //       </div>
        //     </div>

        //     <div className="w-full mb-10 inline-block">
        //       <div className="flex justify-between items-center">
        //         <h5 className="text-2xl font-bold">Tổng Tiền</h5>
        //         <span className="text-2xl text-success ">
        //           {adultPrice * numberOfAdults +
        //             numberOfChilds * childPrice +
        //             numberOfInfants * infantPrice}
        //         </span>
        //       </div>
        //     </div>
        //     <div className="w-full mb-10 inline-block">
        //       <div className="flex justify-between items-center">
        //         <h5 className="text-2xl font-bold">Phương Thức Thanh Toán</h5>
        //         <span className="text-2xl text-success ">
        //           {selectedOrder?.paymentMethod || ''}
        //         </span>
        //       </div>
        //     </div>
        //     <div className="w-full mb-10 inline-block">
        //       <div className="flex justify-between items-center">
        //         <h5 className="text-2xl font-bold">Trạng Thái</h5>
        //         <span className="text-2xl text-success ">
        //           {selectedOrder?.status || ''}
        //         </span>
        //       </div>
        //     </div>
        //     <div className="w-full mb-10 inline-block">
        //       <div className="flex justify-between items-center">
        //         <h5 className="text-2xl font-bold">Ngày Đặt</h5>
        //         <span className="text-2xl text-success ">
        //           {selectedOrder?.createdAt || ''}
        //         </span>
        //       </div>
        //     </div>
        //   </>
        //)
        //  }
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {' '}
                <b>ID </b>
              </TableCell>
              <TableCell align="center"> {selectedOrder?.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Người Đặt </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {selectedOrder?.user?.fullname}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Ngày Đặt </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {selectedOrder?.createdAt
                  ? new Date(selectedOrder?.createdAt).toLocaleDateString(
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
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Tour </b>
              </TableCell>
              <TableCell align="center"> {selectedOrder?.tour.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Ngày bắt đầu </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {selectedOrder?.startDate
                  ? new Date(selectedOrder?.startDate).toLocaleDateString(
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
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Người lớn </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {selectedOrder?.numberOfAdults}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Trẻ em </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {selectedOrder?.numberOfChilds}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Trẻ sơ sinh </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {selectedOrder?.numberOfInfants}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Tổng tiền </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                ${' '}
                {adultPrice * numberOfAdults +
                  numberOfChilds * childPrice +
                  numberOfInfants * infantPrice}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Ghi Chú Khác </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {selectedOrder?.otherRequest}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Phương thức thanh toán</b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {selectedOrder?.paymentMethod}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Transaction ID</b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {selectedOrder?.transactionId}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Trạng thái thanh toán </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {selectedOrder?.status == 'PAID' ? (
                  <Chip label="PAID" color="success" />
                ) : (
                  <Chip label="Not" color="error" />
                )}
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      )}
    </SideModal>
  )
}

export default OrderDetailModal
