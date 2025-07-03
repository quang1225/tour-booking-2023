import React from 'react'
import Image from 'next/image'
import { EditOutlined } from '@mui/icons-material'
import Button from '../Button'
import SideModal, { SideModalI } from './SideModal'
import { Tour } from '@/queries/types'
import { Table, TableHead, TableRow, TableCell, Chip } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_TOUR_DETAIL_QUERY } from '@/queries/tour'
interface ProductDetailModalI extends SideModalI {
  selectedProduct1: Tour | undefined
  onProductEdit: () => void
}

const ProductDetailModal: React.FC<ProductDetailModalI> = ({
  visible,
  selectedProduct1,
  onProductEdit,
  onClose,
}: ProductDetailModalI) => {
  const {
    data: selectedProductD,
    loading: loadingTourDetail,
    // refetch: reFecthCate,
  } = useQuery(GET_TOUR_DETAIL_QUERY, {
    variables: { where: { id: Number(selectedProduct1?.id) } },
  })
  const selectedProduct = selectedProductD?.getTour
  return (
    <SideModal visible={visible} onClose={onClose}>
      <div>
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="ff-lato font-black text-2xl">Chi tiết tour</h1>
          </div>
          <div className="w-10 h-10">
            <Button
              variant="primary"
              type="button"
              style={{ height: '100%', padding: 0 }}
              onClick={onProductEdit}
              className="rounded-xl"
            >
              <EditOutlined />
            </Button>
          </div>
        </div>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {' '}
                <b>ID Tour </b>
              </TableCell>
              <TableCell align="center"> {selectedProduct?.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Tên Tour </b>
              </TableCell>
              <TableCell align="center"> {selectedProduct?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Ảnh Đại Diện </b>
              </TableCell>
              <TableCell align="right">
                {' '}
                <Image
                  src={selectedProduct?.featuredImage || ''}
                  width={100}
                  height={100}
                  alt=""
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Ảnh Khác </b>
              </TableCell>
              <TableCell>
                <div className="flex flex-row flex-wrap">
                  {selectedProduct?.galleryImgs.split(',').map((x) => (
                    <div
                      key={x}
                      className={
                        'relative w-24 h-fit bg-lightGray p-2 border-gray border-1 rounded-lg mr-2 mb-1 mt-1 $'
                      }
                    >
                      <Image src={x} width={300} height={300} alt="" />
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Số lượt đặt </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {selectedProduct?._count?.orders}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Số lượt thích </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {selectedProduct?._count?.users}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Ngày tạo</b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {selectedProduct?.createdAt
                  ? new Date(selectedProduct?.createdAt).toLocaleDateString(
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
                <b>Nhóm </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {selectedProduct?.categories.map((x) => x.name).join(', ')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Khoảng Thời gian </b>
              </TableCell>
              <TableCell align="center"> {selectedProduct?.duration}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                {' '}
                <b>Giá Người lớn </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {`$${selectedProduct?.adultPrice}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Giá Trẻ em </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {`$${selectedProduct?.childPrice}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Giá Trẻ sơ sinh </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {`$${selectedProduct?.infantPrice}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {' '}
                <b>Trạng thái </b>
              </TableCell>
              <TableCell align="center">
                {' '}
                {selectedProduct?.isActive == true ? (
                  <Chip label="Active" color="success" />
                ) : (
                  <Chip label="InActive" color="error" />
                )}{' '}
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
        {/* <div className="flex mt-5 py-2">
        {selectedProduct?.featuredImage.map((image, index) => {
          const isBackgroundColor = selectedProduct.slideColors[index]?.backgroundColor;
          return (
            <div
              key={`${image.name}-${index}`}
              className="w-32 h-32 rounded-xl overflow-hidden bg-white mr-3.5 flex justify-center items-center border border-gray/50 hover:shadow-2xl ease-in duration-300"
              style={isBackgroundColor ? { backgroundColor: selectedProduct.slideColors[index]?.backgroundColor } : {}}
            >
              <Image src={image.url} width={300} height={300} alt="" />
            </div>
          );
        })}
      </div> */}
        <div className="flex flex-col gap-2 mt-3">
          <label>
            <b>Mô tả:</b>
          </label>
          <div
            dangerouslySetInnerHTML={{
              __html: selectedProduct?.description || '',
            }}
          />
        </div>
      </div>
    </SideModal>
  )
}
export default ProductDetailModal
