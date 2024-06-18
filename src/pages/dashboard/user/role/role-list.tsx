import DataGridComponent from '@/components/common-components/DataGridComponent'
import { HandleControls, PageControls } from '@/types/common'
import { LoadingButton } from '@mui/lab'
import { Alert, Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useCallback, useEffect, useState } from 'react'
import RoleForm from './role-form'
import { getRoles } from '@/lib/role'
import { useLoading } from '@/context/LoadingContext'

type Props = {}

const RoleList = (props: Props) => {
  const defaultHandleControls: HandleControls = {
    currentPage: 1,
    limitPerPage: 5,
    search: '',
    sortOrder: 'firstName',
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
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value: any, row: any) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ]
  const { setLoading } = useLoading()
  const [openFormDrawer, setOpenFormDrawer] = useState<boolean>(false)
  const [handleControls, setHandleControls] = useState<HandleControls>(defaultHandleControls)
  const [pageControls, setPageControls] = useState<PageControls>(defaultPageControls)
  const [data, setData] = useState<any[]>([])
  const [entity, setEntity] = useState<any | undefined>(undefined)

  const fetchRoles = async () => {
    const res = await getRoles(handleControls)
    setData(res)
  }

  useEffect(() => {
    console.log('role useEffect')
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
      />
      <RoleForm openFormDrawer={openFormDrawer} setOpenFormDrawer={setOpenFormDrawer} />
    </Box>
  )
}

export default RoleList
