'use client'
import { EditOutlined } from '@mui/icons-material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SectionHeading from '../(components)/SectionHeading'

import { UserUpdateModal } from '../(components)/Modals'
import {
  ListContainer,
  ListRow,
  ListItem,
  LoaderRef,
} from '../(components)/List'
import { GET_USER_COUNT_QUERY, GET_USER_QUERY } from '@/queries/user'
import { User } from '@/queries/types'
import { useQuery } from '@apollo/client'
import userOfline from '@/db/offlineData/users'
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import Button from '@/shared/Button'
import PaginationAdmin from '../(components)/Form/PaginationAdmin'
const PAGE_SIZE = 5
const UsersAdminPage = () => {
  const loader = useRef<LoaderRef>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: userData,
    loading: loadingUser,
    refetch: refeshUserList,
  } = useQuery(GET_USER_QUERY, {
    variables: {
      take: PAGE_SIZE,
      skip: (currentPage - 1) * PAGE_SIZE,
    },
  })

  const users = (userData?.users || []) as User[]
  const [showUserUpdateModal, setshowUserUpdateModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)

  const updateSelectedUser = useCallback(
    async (id: string) => {
      setshowUserUpdateModal(true)
      setSelectedUser(users.find((x) => x.id.toString() === id))
    },
    [users]
  )

  const {
    data: countUser,
    loading: loadingCount,
    refetch: refeshCount,
  } = useQuery(GET_USER_COUNT_QUERY)

  const countTotal = countUser?.aggregateUser._count?.id || 0
  const lastPage = Math.ceil(countTotal / PAGE_SIZE)

  const onFormClose = useCallback(() => {
    setshowUserUpdateModal(false)
    setSelectedUser(undefined)
  }, [])
  const hideUserDetail = useCallback(() => {
    setshowUserUpdateModal(false)
  }, [])

  // useEffect(() => {
  //   getUsers(null);
  // }, [getUsers]);

  // useEffect(() => {
  //   let observer: IntersectionObserver;
  //   if (loader.current) {
  //     observer = createObserver(loader, () => {
  //       if (users.nextPage) {
  //         getUsers(users.nextPage);
  //       }
  //     });
  //   }
  //   return () => {
  //     if (observer) {
  //       observer.disconnect();
  //     }
  //   };
  // }, [createObserver, getUsers, users]);

  //const users = Object.values(users.data);
  //const users =userOfline;
  return (
    <>
      <div className="">
        {/* <SectionHeading title={`Users (${users.count})`} /> */}
        <SectionHeading title={`Users (${countTotal})`} />
        <div className="w-full h-full overflow-auto px-2 py-1">
          <ListContainer
            className="relative mw-1024 tableMaxHeight"
            isLoading={loadingUser}
            message={users.length === 0 ? 'No users available.' : null}
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
                    <b>Email</b>
                  </TableCell>
                  <TableCell>
                    <b>Số đơn hàng</b>
                  </TableCell>
                  <TableCell>
                    <b>Số tour đã thích</b>
                  </TableCell>
                  <TableCell>
                    <b>Ngày Đăng Ký</b>
                  </TableCell>
                  <TableCell>
                    <b>Trạng Thái</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>#</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((data) => (
                  <TableRow
                    key={data.fullname}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {data.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.fullname}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data._count?.orders}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data._count?.savedList}
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
                        onAction={updateSelectedUser}
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
      <UserUpdateModal
        visible={showUserUpdateModal}
        selectedUser={selectedUser}
        onClose={onFormClose}
        refeshUserList={refeshUserList}
      />
    </>
  )
}

export default UsersAdminPage
