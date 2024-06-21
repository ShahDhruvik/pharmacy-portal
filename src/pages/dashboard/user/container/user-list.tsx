import DataGridComponent from '@/components/common-components/DataGridComponent'
import { HandleControls, PageControls } from '@/types/common'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Box, Chip, IconButton, Switch } from '@mui/material'
import { GridColDef, useGridApiRef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import UserForm from './user-form'
import { deleteUser, getUsers, inactiveUser } from '@/lib/user'
import { useLoading } from '@/context/LoadingContext'
import { User, UserFormFields } from '@/types/user.types'
import { CONST_APP_IMAGE_URL, Tables, limitPerPage } from '@/utils/constants'
import { VITE_APP_IMAGE_URL } from '@/utils/envVariables'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ConfirmationPopUp from '@/components/common-components/confirm-popup'
import { useAskConfirmation } from '@/context/ConfirmContext'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { Role } from '@/types/role.types'
import { dropdownRoles } from '@/lib/role'

type Props = {}

const UserList = (props: Props) => {
  const defaultHandleControls: HandleControls = {
    currentPage: 1,
    limitPerPage: limitPerPage,
    search: '',
    sortOrder: 'asc',
    sortParam: 'createdAt',
  }
  const defaultPageControls: PageControls = {
    currentPage: 0,
    from: 0,
    pages: 0,
    to: 0,
    total: 0,
  }

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  })
  const { setLoading, loading } = useLoading()
  const { setAskConfirmation } = useAskConfirmation()
  const [openFormDrawer, setOpenFormDrawer] = useState<boolean>(false)
  const [dataNotFound, setDataNotFound] = useState<boolean>(false)
  const [handleControls, setHandleControls] = useState<HandleControls>(defaultHandleControls)
  const [pageControls, setPageControls] = useState<PageControls>(defaultPageControls)
  const [data, setData] = useState<User[]>([])
  const [entity, setEntity] = useState<User | undefined>(undefined)
  const getRolesDrp = async () => {
    const res = await dropdownRoles()
  }
  const fetchUsers = async () => {
    setLoading({ isLoading: true, loadingProps: { table: Tables?.User } })
    const res = await getUsers(handleControls)
    if (res) {
      const { records, ...rest } = res
      setData(records)
      setPageControls(rest)
      setPaginationModel({ page: rest?.currentPage, pageSize: handleControls?.limitPerPage })
      setDataNotFound(records?.length === 0)
    }
    setLoading({ isLoading: false })
  }
  const removeUser = async (entity: User) => {
    setLoading({ isLoading: true, loadingProps: { btnLoading: true } })
    const res = await deleteUser(entity?.internalId)
    if (res) {
      const { records, ...rest } = res
      setData(records)
      setPageControls(rest)
      setPaginationModel({ page: rest?.currentPage, pageSize: handleControls?.limitPerPage })
      setDataNotFound(records?.length === 0)
    }
    setLoading({ isLoading: false })
  }
  const handleReFetch = () => {
    setData([])
    setHandleControls(defaultHandleControls)
  }
  useEffect(() => {
    fetchUsers()
  }, [handleControls])
  const columns: GridColDef[] = [
    {
      field: 'icon',
      headerName: 'Icon',
      width: 70,
      editable: true,
      renderCell: (params) => {
        const row = params?.row
        return (
          <div className='flex items-center h-full'>
            <Avatar
              src={(VITE_APP_IMAGE_URL || CONST_APP_IMAGE_URL) + row?.profilePic}
              alt={row?.name}
            />
          </div>
        )
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: true,
    },
    {
      field: 'mobile',
      headerName: 'Mobile',
      width: 200,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      editable: true,
    },
    {
      field: 'PharmaOrgRole',
      headerName: 'Role',
      width: 200,
      editable: true,
      renderCell: (params) => {
        const row = params?.row
        return <p>{row?.PharmaOrgRole?.displayName}</p>
      },
    },
    {
      field: 'pharmacyData',
      headerName: `Pharmacy's`,
      width: 200,
      editable: true,
      renderCell: (params) => {
        const row = params?.row
        return (
          <div>
            {row?.pharmacyData?.map((x: any) => {
              return (
                <Chip size='small' label={x?.name} avatar={<Avatar>{x?.name?.charAt(0)}</Avatar>} />
              )
            })}
          </div>
        )
      },
    },

    {
      field: 'isActive',
      headerName: 'Actions',
      width: 200,
      editable: true,
      renderCell: (params) => {
        const row = params?.row
        return (
          <div className='flex items-center h-full'>
            <IconButton
              onClick={() => {
                setEntity(row)
                setOpenFormDrawer(true)
              }}
            >
              <EditIcon />
            </IconButton>
            <LoadingButton
              color='mDarkGray'
              onClick={() => {
                setAskConfirmation({
                  isConfirmation: true,
                  confirmProps: {
                    confirmationText: COMMON_MESSAGE.DeleteConfirmation,
                    handleCancel: () => {
                      setAskConfirmation({ confirmProps: undefined, isConfirmation: false })
                    },
                    handleConfirm: async () => {
                      setLoading({ isLoading: true, loadingProps: { btnLoading: true } })
                      const res = await deleteUser(row?.internalId)
                      if (res) {
                        handleReFetch()
                        setAskConfirmation({ confirmProps: undefined, isConfirmation: false })
                      }
                      setLoading({ isLoading: false })
                    },
                  },
                })
              }}
            >
              <DeleteIcon />
            </LoadingButton>
            <Switch
              checked={row?.isActive}
              onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                setAskConfirmation({
                  isConfirmation: true,
                  confirmProps: {
                    confirmationText: row?.isActive
                      ? COMMON_MESSAGE.InActiveConfirmation
                      : COMMON_MESSAGE.ActiveConfirmation,
                    handleCancel: () => {
                      setAskConfirmation({ confirmProps: undefined, isConfirmation: false })
                    },
                    handleConfirm: async () => {
                      setLoading({ isLoading: true, loadingProps: { btnLoading: true } })
                      const res = await inactiveUser(row?.internalId, row?.isActive)
                      if (res) {
                        handleReFetch()
                        setAskConfirmation({ confirmProps: undefined, isConfirmation: false })
                      }
                      setLoading({ isLoading: false })
                    },
                  },
                })
              }}
            />
          </div>
        )
      },
    },
  ]
  return (
    <Box>
      <Alert className='mb-3' severity='info'>
        By configuring Users effectively, you can ensure that Users have the appropriate level of
        access
      </Alert>
      <Box display={'flex'} justifyContent={'end'}>
        <LoadingButton
          variant='text'
          color='mPink'
          onClick={() => {
            setEntity(undefined)
            setOpenFormDrawer(true)
          }}
        >
          ADD +
        </LoadingButton>
      </Box>
      <DataGridComponent
        columns={columns}
        rows={data}
        pageControls={pageControls}
        handleControls={handleControls}
        loading={loading}
        tableName={Tables?.User}
        setHandleControls={setHandleControls}
      />
      <UserForm
        openFormDrawer={openFormDrawer}
        setOpenFormDrawer={setOpenFormDrawer}
        entity={entity as User}
        handleReFetch={handleReFetch}
      />
      <ConfirmationPopUp />
    </Box>
  )
}

export default UserList
