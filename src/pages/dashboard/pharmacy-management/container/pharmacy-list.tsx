import DataGridComponent from '@/components/common-components/DataGridComponent'
import { HandleControls, PageControls } from '@/types/common'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Box, Button, IconButton, Switch } from '@mui/material'
import { GridColDef, useGridApiRef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
// import { deletePharmacy, getPharmacys, inactivePharmacy } from '@/lib/pharmacy'
import { useLoading } from '@/context/LoadingContext'
// import { Pharmacy, PharmacyFormFields } from '@/types/pharmacy.types'
import { CONST_APP_IMAGE_URL, Tables, limitPerPage } from '@/utils/constants'
import { VITE_APP_IMAGE_URL } from '@/utils/envVariables'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ConfirmationPopUp from '@/components/common-components/confirm-popup'
import { useAskConfirmation } from '@/context/ConfirmContext'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { Role } from '@/types/role.types'
import { dropdownRoles } from '@/lib/role'
import PharmacyForm from './pharmacy-form'

type Props = {}

const PharmacyList = (props: Props) => {
  // const defaultHandleControls: HandleControls = {
  //   currentPage: 1,
  //   limitPerPage: limitPerPage,
  //   search: '',
  //   sortOrder: 'asc',
  //   sortParam: 'createdAt',
  // }
  // const defaultPageControls: PageControls = {
  //   currentPage: 0,
  //   from: 0,
  //   pages: 0,
  //   to: 0,
  //   total: 0,
  // }

  // const [paginationModel, setPaginationModel] = useState({
  //   page: 0,
  //   pageSize: 50,
  // })
  // const { setLoading, loading } = useLoading()
  // const { setAskConfirmation } = useAskConfirmation()
  const [openFormDrawer, setOpenFormDrawer] = useState<boolean>(false)
  // const [dataNotFound, setDataNotFound] = useState<boolean>(false)
  // const [handleControls, setHandleControls] = useState<HandleControls>(defaultHandleControls)
  // const [pageControls, setPageControls] = useState<PageControls>(defaultPageControls)
  // const [data, setData] = useState<Pharmacy[]>([])
  // const [entity, setEntity] = useState<Pharmacy | undefined>(undefined)
  // const getRolesDrp = async () => {
  //   const res = await dropdownRoles()
  // }
  // const fetchPharmacys = async () => {
  //   setLoading({ isLoading: true, loadingProps: { table: Tables?.Pharmacy } })
  //   const res = await getPharmacys(handleControls)
  //   if (res) {
  //     const { records, ...rest } = res
  //     setData(records)
  //     setPageControls(rest)
  //     setPaginationModel({ page: rest?.currentPage, pageSize: handleControls?.limitPerPage })
  //     setDataNotFound(records?.length === 0)
  //   }
  //   setLoading({ isLoading: false })
  // }
  // const removePharmacy = async (entity: Pharmacy) => {
  //   setLoading({ isLoading: true, loadingProps: { btnLoading: true } })
  //   const res = await deletePharmacy(entity?.internalId)
  //   if (res) {
  //     const { records, ...rest } = res
  //     setData(records)
  //     setPageControls(rest)
  //     setPaginationModel({ page: rest?.currentPage, pageSize: handleControls?.limitPerPage })
  //     setDataNotFound(records?.length === 0)
  //   }
  //   setLoading({ isLoading: false })
  // }
  // const handleReFetch = () => {
  //   setData([])
  //   setHandleControls(defaultHandleControls)
  // }
  // useEffect(() => {
  //   fetchPharmacys()
  // }, [handleControls])
  // const columns: GridColDef[] = [
  //   {
  //     field: 'icon',
  //     headerName: 'Icon',
  //     width: 70,
  //     editable: true,
  //     renderCell: (params) => {
  //       const row = params?.row
  //       return (
  //         <div className='flex items-center h-full'>
  //           <Avatar src={(VITE_APP_IMAGE_URL || CONST_APP_IMAGE_URL) + row?.icon} alt={row?.name} />
  //         </div>
  //       )
  //     },
  //   },
  //   {
  //     field: 'name',
  //     headerName: 'Name',
  //     width: 200,
  //     editable: true,
  //   },
  //   {
  //     field: 'mobile',
  //     headerName: 'Mobile',
  //     width: 200,
  //     editable: true,
  //   },
  //   {
  //     field: 'email',
  //     headerName: 'Email',
  //     width: 200,
  //     editable: true,
  //   },
  //   {
  //     field: 'PharmaOrgRole',
  //     headerName: 'Role',
  //     width: 200,
  //     editable: true,
  //     renderCell: (params) => {
  //       const row = params?.row
  //       return <p>{row?.PharmaOrgRole?.displayName}</p>
  //     },
  //   },

  //   {
  //     field: 'isActive',
  //     headerName: 'Actions',
  //     width: 200,
  //     editable: true,
  //     renderCell: (params) => {
  //       const row = params?.row
  //       return (
  //         <div className='flex items-center h-full'>
  //           <IconButton
  //             onClick={() => {
  //               setEntity(row)
  //               setOpenFormDrawer(true)
  //             }}
  //           >
  //             <EditIcon />
  //           </IconButton>
  //           <LoadingButton
  //             color='mDarkGray'
  //             onClick={() => {
  //               setAskConfirmation({
  //                 isConfirmation: true,
  //                 confirmProps: {
  //                   confirmationText: COMMON_MESSAGE.DeleteConfirmation,
  //                   handleCancel: () => {
  //                     setAskConfirmation({ confirmProps: undefined, isConfirmation: false })
  //                   },
  //                   handleConfirm: async () => {
  //                     setLoading({ isLoading: true, loadingProps: { btnLoading: true } })
  //                     const res = await deletePharmacy(row?.internalId)
  //                     if (res) {
  //                       handleReFetch()
  //                       setAskConfirmation({ confirmProps: undefined, isConfirmation: false })
  //                     }
  //                     setLoading({ isLoading: false })
  //                   },
  //                 },
  //               })
  //             }}
  //           >
  //             <DeleteIcon />
  //           </LoadingButton>
  //           <Switch
  //             checked={row?.isActive}
  //             onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
  //               setAskConfirmation({
  //                 isConfirmation: true,
  //                 confirmProps: {
  //                   confirmationText: row?.isActive
  //                     ? COMMON_MESSAGE.InActiveConfirmation
  //                     : COMMON_MESSAGE.ActiveConfirmation,
  //                   handleCancel: () => {
  //                     setAskConfirmation({ confirmProps: undefined, isConfirmation: false })
  //                   },
  //                   handleConfirm: async () => {
  //                     setLoading({ isLoading: true, loadingProps: { btnLoading: true } })
  //                     const res = await inactivePharmacy(row?.internalId, row?.isActive)
  //                     if (res) {
  //                       handleReFetch()
  //                       setAskConfirmation({ confirmProps: undefined, isConfirmation: false })
  //                     }
  //                     setLoading({ isLoading: false })
  //                   },
  //                 },
  //               })
  //             }}
  //           />
  //         </div>
  //       )
  //     },
  //   },
  // ]
  return (
    <Box>
      <Alert className='mb-3' severity='info'>
        By configuring Pharmacys effectively, you can ensure that Pharmacys have the appropriate
        level of access
      </Alert>
      <Box display={'flex'} justifyContent={'end'}>
        <LoadingButton
          variant='text'
          color='mPink'
          onClick={() => {
            setOpenFormDrawer(true)
          }}
        >
          ADD +
        </LoadingButton>
      </Box>
      <div className='grid grid-cols-auto-fit gap-5'>
        <div className='bg-mLightWhite-main shadow-cardShadow w-full aspect-[7/3] relative p-container'>
          <div className='absolute top-0 right-0'>
            <Switch />
          </div>
          <div className='absolute bottom-2 right-2'>
            <LoadingButton
              variant='text'
              color='mPink'
              sx={{ fontSize: '14px', textTransform: 'uppercase' }}
            >
              Download Data
            </LoadingButton>
          </div>
          <div>
            <Avatar />
          </div>
        </div>
        <div className='bg-mLightWhite-main shadow-cardShadow w-full aspect-[7/3]'>h</div>
        <div className='bg-mLightWhite-main shadow-cardShadow w-full aspect-[7/3]'>h</div>
      </div>
      <PharmacyForm openFormDrawer={openFormDrawer} setOpenFormDrawer={setOpenFormDrawer} />
      <ConfirmationPopUp />
    </Box>
  )
}

export default PharmacyList
