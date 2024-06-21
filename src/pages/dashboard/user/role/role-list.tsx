import DataGridComponent from '@/components/common-components/DataGridComponent'
import { HandleControls, PageControls } from '@/types/common'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Box, IconButton, Switch } from '@mui/material'
import { GridColDef, useGridApiRef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import RoleForm from './role-form'
import { deleteRole, getRoles, inactiveRole } from '@/lib/role'
import { useLoading } from '@/context/LoadingContext'
import { Role, RoleFormFields } from '@/types/role.types'
import { CONST_APP_IMAGE_URL, Tables, limitPerPage } from '@/utils/constants'
import { VITE_APP_IMAGE_URL } from '@/utils/envVariables'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ConfirmationPopUp from '@/components/common-components/confirm-popup'
import { useAskConfirmation } from '@/context/ConfirmContext'
import { COMMON_MESSAGE } from '@/utils/commonMessages'

type Props = {}

const RoleList = (props: Props) => {
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
  const { setLoading, loading } = useLoading()
  const { setAskConfirmation } = useAskConfirmation()
  const [openFormDrawer, setOpenFormDrawer] = useState<boolean>(false)
  const [dataNotFound, setDataNotFound] = useState<boolean>(false)
  const [handleControls, setHandleControls] = useState<HandleControls>(defaultHandleControls)
  const [pageControls, setPageControls] = useState<PageControls>(defaultPageControls)
  const [data, setData] = useState<Role[]>([])
  const [entity, setEntity] = useState<Role | undefined>(undefined)

  const fetchRoles = async () => {
    setLoading({ isLoading: true, loadingProps: { table: Tables?.Role } })
    const res = await getRoles(handleControls)
    if (res) {
      const { records, ...rest } = res
      setData(records)
      setPageControls(rest)
      setDataNotFound(records?.length === 0)
    }
    setLoading({ isLoading: false })
  }
  const removeRole = async (entity: Role) => {
    setLoading({ isLoading: true, loadingProps: { btnLoading: true } })
    const res = await deleteRole(entity?.internalId)
    if (res) {
      const { records, ...rest } = res
      setData(records)
      setPageControls(rest)
      setDataNotFound(records?.length === 0)
    }
    setLoading({ isLoading: false })
  }
  const handleReFetch = () => {
    setData([])
    setHandleControls(defaultHandleControls)
  }
  useEffect(() => {
    fetchRoles()
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
            <Avatar src={(VITE_APP_IMAGE_URL || CONST_APP_IMAGE_URL) + row?.icon} />
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
      field: 'displayName',
      headerName: 'DisplayName',
      width: 200,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
      editable: true,
    },
    {
      field: '',
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
                      const res = await deleteRole(row?.internalId)
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
                      const res = await inactiveRole(row?.internalId, row?.isActive)
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
        By configuring roles effectively, you can ensure that Roles have the appropriate level of
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
        tableName={Tables?.Role}
        setHandleControls={setHandleControls}
      />
      <RoleForm
        openFormDrawer={openFormDrawer}
        setOpenFormDrawer={setOpenFormDrawer}
        entity={entity as Role}
        handleReFetch={handleReFetch}
      />
      <ConfirmationPopUp />
    </Box>
  )
}

export default RoleList
