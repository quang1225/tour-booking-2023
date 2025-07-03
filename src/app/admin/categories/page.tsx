'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Delete, EditOutlined } from '@mui/icons-material'
import SectionHeading from '../(components)/SectionHeading'

import { ListContainer, ListRow, ListItem } from '../(components)/List'
import { AddCategoryModal } from '../(components)/Modals'
import { Category } from '@/queries/types'
import {
  DELETE_CATEGORY_MUTATE,
  GET_CATEGORIES_COUNT_QUERY,
  GET_CATEGORIES_QUERY,
} from '@/queries/tour'
import { useMutation, useQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material'
import PaginationAdmin from '../(components)/Form/PaginationAdmin'
const PAGE_SIZE = 5
const CategoriesAdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const {
    data: categoriesData,
    loading: loadingCategories,
    refetch: refeshCateList,
  } = useQuery(GET_CATEGORIES_QUERY, {
    variables: {
      take: PAGE_SIZE,
      skip: (currentPage - 1) * PAGE_SIZE,
    },
  })
  const categories = (categoriesData?.categories || []) as Category[]
  const [deleteCategory, { data: deleteData, loading: loadingDelete }] =
    useMutation(DELETE_CATEGORY_MUTATE)
  // const [categories, setCategories] = useState<Record<string, CategoryI>>({});
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined)

  const updateSelectedCategory = (id: string) => {
    setShowAddCategoryModal(true)
    setSelectedCategory(categories.find((x) => x.id === Number(id)))
  }

  const [open, setOpen] = React.useState(false)

  const {
    data: countCate,
    loading: loadingCount,
    refetch: refeshCount,
  } = useQuery(GET_CATEGORIES_COUNT_QUERY)

  const countTotal = countCate?.aggregateCategory._count?.id || 0

  const lastPage = Math.ceil(countTotal / PAGE_SIZE)
  const handleClickOpen = (id: string) => {
    setOpen(true)
    setSelectedCategory(categories.find((x) => x.id === Number(id)))
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleYes = () => {
    deleteSelectedCategory(`${selectedCategory?.id}`)
  }

  const deleteSelectedCategory = async (id: string) => {
    const ids = categories.find((x) => x.id === Number(id))
    const categoryRes = await deleteCategory({
      variables: {
        where: {
          id: ids?.id,
        },
      },
    })
    if (categoryRes?.data) {
      toast.success(`Delete success!`)
      setOpen(false)
      if (categories.length === 1 && currentPage > 1) {
        setCurrentPage((pre) => pre - 1)
      }
      refeshCateList()
      refeshCount()
      setSelectedCategory(undefined)
    } else {
      toast.error('Category đã được dùng không được xóa!')
      setOpen(false)
    }
  }

  const onFormClose = useCallback(() => {
    setShowAddCategoryModal(false)
    setSelectedCategory(undefined)
  }, [])

  // const cates = offlineCate;
  return (
    <>
      <div className="">
        <SectionHeading
          title={`Loại Tour (${countTotal})`}
          isAction={true}
          buttonText="Thêm loại"
          onAction={() => setShowAddCategoryModal(true)}
        />
        {/* <Button color="secondary"  onClick={() => setShowAddCategoryModal(true)}>Add Category</Button> */}
        <div className="w-full h-full overflow-y px-2 py-1">
          <ListContainer
            className="mw-1024 tableMaxHeight"
            isLoading={loadingCategories}
            message={
              categories.length === 0 ? 'No categories available.' : null
            }
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>ID</b>
                  </TableCell>
                  <TableCell>
                    <b>Tên</b>
                  </TableCell>

                  <TableCell>
                    <b>Tổng số tour</b>
                  </TableCell>
                  <TableCell>
                    <b>Ngày Tạo</b>
                  </TableCell>
                  <TableCell>
                    <b>Trạng Thái</b>
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
                {categories.map((data) => (
                  <TableRow
                    key={data.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {data.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.name}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {data._count?.tours}
                    </TableCell>
                    <TableCell component="th">
                      {' '}
                      {data.createdAt
                        ? new Date(data.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                          })
                        : ''}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.isActive == true ? (
                        <Chip label="Active" color="success" />
                      ) : (
                        <Chip label="InActive" color="error" />
                      )}
                    </TableCell>

                    <TableCell component="th">
                      {' '}
                      <ListItem
                        type="action"
                        text=""
                        className="w-10"
                        childClasses="radius-10 mx-auto"
                        index={`${data.id}`}
                        actionIcon={EditOutlined}
                        onAction={updateSelectedCategory}
                      />
                    </TableCell>
                    <TableCell component="th">
                      <ListItem
                        type="action"
                        text=""
                        index={`${data.id}`}
                        className="w-10"
                        actionIcon={Delete}
                        childClasses="radius-10"
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
        maxLength={11}
        setCurrentPage={setCurrentPage}
      />
      <AddCategoryModal
        visible={showAddCategoryModal}
        selectedCategory={selectedCategory}
        onClose={onFormClose}
        refeshCateList={refeshCateList}
        refestCount={refeshCount}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Bạn có muốn xóa?'}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Không</Button>
          <Button onClick={handleYes}>Có</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CategoriesAdminPage
