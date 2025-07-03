'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import {
  ListContainer,
  ListRow,
  ListItem,
  LoaderRef,
} from '../(components)/List'
import SectionHeading from '../(components)/SectionHeading'
import { useMutation, useQuery } from '@apollo/client'
import { Tour } from '@/queries/types'
import {
  DELETE_TOUR_MUTATE,
  GET_TOURS_COUNT_QUERY,
  GET_TOURS_QUERY,
} from '@/queries/tour'
import AddTourModal from '../(components)/Modals/AddTourModal'
import { ProductDetailModal } from '../(components)/Modals'
import { toast } from 'react-toastify'
import { Delete } from '@mui/icons-material'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from '@mui/material'
import PaginationAdmin from '../(components)/Form/PaginationAdmin'
import useMutateUploadImages from '@/hooks/api/useMutateUploadImages'

const PAGE_SIZE = 5
const ProductsAdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const loader = useRef<LoaderRef>(null)
  const [selectedTour, setselectedTour] = useState<Tour | undefined>(undefined)
  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const [showProductDetail, setShowProductDetail] = useState(false)
  const {
    data: tourData,
    loading: loadingTour,
    refetch: refeshTour,
  } = useQuery(GET_TOURS_QUERY, {
    variables: {
      take: PAGE_SIZE,
      skip: (currentPage - 1) * PAGE_SIZE,
    },
  })
  const tours = (tourData?.tours || []) as Tour[]

  const { data: countTour, refetch: refetchCount } = useQuery(
    GET_TOURS_COUNT_QUERY
  )

  const countTotal = countTour?.aggregateTour._count?.id || 0

  const lastPage = Math.ceil(countTotal / PAGE_SIZE)

  const viewProductDetail = useCallback(
    async (id: string) => {
      setShowProductDetail(true)
      setselectedTour(tours.find((x) => x.id.toString() === id))
    },
    [tours]
  )
  const hideProductDetail = useCallback(() => {
    setShowProductDetail(false)
    setselectedTour(undefined)
  }, [selectedTour])

  const showProductForm = useCallback(() => {
    if (selectedTour) {
      setShowProductDetail(false)
    }
    setShowAddProductForm(true)
  }, [selectedTour, setShowProductDetail, setShowAddProductForm])

  const hideProductForm = useCallback(() => {
    if (selectedTour) {
      setShowProductDetail(true)
    }
    setShowAddProductForm(false)
  }, [selectedTour, setShowAddProductForm, setShowProductDetail])

  const [deleteTour, { data: deleteData, loading: loadingDelete }] =
    useMutation(DELETE_TOUR_MUTATE)

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = (id: string) => {
    setOpen(true)
    setselectedTour(tours.find((x) => x.id === Number(id)))
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleYes = () => {
    deleteTourSelected(`${selectedTour?.id}`)
  }
  const deleteTourSelected = async (id: string) => {
    const ids = tours.find((x) => x.id === Number(id))
    const tourRes = await deleteTour({
      variables: {
        where: {
          id: ids?.id,
        },
      },
    })
    if (tourRes?.data) {
      toast.success(`Delete success!`)
      if (tours.length === 1 && currentPage > 1) {
        setCurrentPage((pre) => pre - 1)
      }
      refetchCount()
      refeshTour()
      setOpen(false)
      // setselectedTour(undefined)
    } else {
      toast.error('tour đã được dùng không được xóa!')
      setOpen(false)
    }
  }

  return (
    <>
      <div className="">
        <SectionHeading
          title={`Tour (${countTotal})`}
          isAction={true}
          buttonText="Add Tour"
          onAction={showProductForm}
        />
        <div className="w-full h-full overflow-auto px-2 py-1">
          <ListContainer
            className="relative mw-1024 tableMaxHeight"
            isLoading={loadingTour}
            message={''}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    {' '}
                    <b>ID Tour</b>
                  </TableCell>
                  <TableCell>
                    {' '}
                    <b>Tên Tour</b>
                  </TableCell>
                  <TableCell>
                    {' '}
                    <b>Ảnh Đại Diện</b>
                  </TableCell>
                  <TableCell>
                    {' '}
                    <b>Số lượng đặt</b>
                  </TableCell>
                  <TableCell>
                    {' '}
                    <b>Số lượt thích</b>
                  </TableCell>
                  <TableCell>
                    {' '}
                    <b>Tên Nhóm</b>
                  </TableCell>
                  {/* <TableCell  > <b>Mô tả</b></TableCell> */}
                  <TableCell>
                    {' '}
                    <b>Thời gian</b>
                  </TableCell>
                  <TableCell>
                    {' '}
                    <b>Người lớn</b>
                  </TableCell>
                  <TableCell>
                    {' '}
                    <b>Trẻ em</b>
                  </TableCell>
                  <TableCell>
                    {' '}
                    <b>Sơ sinh</b>
                  </TableCell>
                  <TableCell>
                    {' '}
                    <b>Is Active</b>
                  </TableCell>
                  <TableCell align="right">
                    {' '}
                    <b>Ngày Tạo</b>
                  </TableCell>
                  <TableCell align="right">
                    <b></b>
                  </TableCell>
                  <TableCell align="right">
                    <b></b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tours.map((tour, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {tour.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {tour.name}
                    </TableCell>
                    <TableCell>
                    <ListItem isImage={true} imagePath={tour.featuredImage} className="w-16 h-16" />
                  </TableCell>
                    <TableCell component="th" scope="row">
                      {tour._count?.orders}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {tour._count?.users}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {tour.categories.map((x) => x.name).join(', ')}
                    </TableCell>
                    {/* <TableCell component="th" scope="row">
                      {tour.description?.substring(0, 30) || ''}
                    </TableCell> */}
                    <TableCell component="th" scope="row">
                      {tour.duration || ''}
                    </TableCell>
                    {/* <TableCell component="th" scope="row">
                      {
                         <Image
                         src={tour.galleryImgs[0]}
                         width={48}
                         height={48}
                       />
                       
                      }
                    </TableCell> */}
                    <TableCell component="th" scope="row">
                      {`$${tour.adultPrice}`}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {`$${tour.childPrice}`}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {`$${tour.infantPrice}`}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {tour.isActive == true ? (
                        <Chip label="Active" color="success" />
                      ) : (
                        <Chip label="InActive" color="error" />
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {tour.createdAt
                        ? new Date(tour.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <ListItem
                        type="action"
                        text="view"
                        index={`${tour.id}`}
                        className="w-20"
                        childClasses="radius-30"
                        onAction={viewProductDetail}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <ListItem
                        type="action"
                        text=""
                        index={`${tour.id}`}
                        className="w-10"
                        actionIcon={Delete}
                        childClasses="radius-20"
                        onAction={handleClickOpen}
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
        maxLength={countTotal}
        setCurrentPage={setCurrentPage}
      />
      <AddTourModal
        visible={showAddProductForm}
        selectedProduct={selectedTour}
        // updateProductState={updateProductState}
        onProductImageDelete={() => {}}
        onClose={hideProductForm}
        refeshTour={refeshTour}
        refetchCount={refetchCount}
        hideDetail={hideProductDetail}
      />
      <ProductDetailModal
        visible={showProductDetail}
        selectedProduct1={selectedTour}
        onProductEdit={showProductForm}
        onClose={hideProductDetail}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'bạn có muốn xóa?'}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Không</Button>
          <Button onClick={handleYes}>Có</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ProductsAdminPage
