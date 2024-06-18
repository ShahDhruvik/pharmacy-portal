import DataGridComponent from '@/components/common-components/DataGridComponent'
import { HandleControls, PageControls } from '@/types/common'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Box, IconButton, Switch } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import RoleForm from './role-form'
import { getRoles } from '@/lib/role'
import { useLoading } from '@/context/LoadingContext'
import { Role, RoleFormFields } from '@/types/role.types'
import { CONST_APP_IMAGE_URL, Tables } from '@/utils/constants'
import { VITE_APP_IMAGE_URL } from '@/utils/envVariables'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

type Props = {}

const RoleList = (props: Props) => {
  const defaultHandleControls: HandleControls = {
    currentPage: 1,
    limitPerPage: 5,
    search: '',
    sortOrder: 'createdAt',
    sortParam: 'asc',
  }
  const defaultPageControls: PageControls = {
    currentPage: 0,
    from: 0,
    pages: 0,
    to: 0,
    total: 0,
  }
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
      field: 'color',
      headerName: 'Color',
      width: 200,
      editable: true,
      renderCell: (params) => {
        const row = params?.row
        return <input value={row?.color} type='color' />
      },
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
            <LoadingButton color='mDarkGray'>
              <DeleteIcon />
            </LoadingButton>
            <Switch checked={row?.isActive} />
          </div>
        )
      },
    },
  ]
  const { setLoading, loading } = useLoading()
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
  useEffect(() => {
    fetchRoles()
  }, [])
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
      />
      <RoleForm
        openFormDrawer={openFormDrawer}
        setOpenFormDrawer={setOpenFormDrawer}
        entity={entity as Role}
      />
    </Box>
  )
}

export default RoleList
