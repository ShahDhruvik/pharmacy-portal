import DataGridComponent from '@/components/common-components/DataGridComponent'
import { HandleControls, PageControls } from '@/types/common'
import { LoadingButton } from '@mui/lab'
import { Alert, Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import RoleForm from './role-form'
import { getRoles } from '@/lib/role'
import { useLoading } from '@/context/LoadingContext'
import { Role } from '@/types/role.types'
import { Tables } from '@/utils/constants'

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
      field: 'displayName',
      headerName: 'First name',
      width: 200,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Last name',
      width: 200,
      editable: true,
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
      <RoleForm openFormDrawer={openFormDrawer} setOpenFormDrawer={setOpenFormDrawer} />
    </Box>
  )
}

export default RoleList
