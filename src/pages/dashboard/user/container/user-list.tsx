import DataGridComponent from '@/components/common-components/DataGridComponent'
import { HandleControls, PageControls } from '@/types/common'
import { LoadingButton } from '@mui/lab'
import { Alert, Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import UserForm from './user-form'

type Props = {}

const UserList = (props: Props) => {
  const [openFormDrawer, setOpenFormDrawer] = useState<boolean>(false)
  const pageControls: PageControls = {
    currentPage: 1,
    from: 1,
    pages: 3,
    to: 5,
    total: 12,
  }
  const handleControls: HandleControls = {
    currentPage: 1,
    limitPerPage: 5,
    search: '',
    sortOrder: 'firstName',
    sortParam: 'asc',
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
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  ]
  return (
    <Box>
      <Alert className='mb-3' severity='info'>
        By configuring roles effectively, you can ensure that users have the appropriate level of
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
        rows={rows}
        pageControls={pageControls}
        handleControls={handleControls}
      />
      <UserForm openFormDrawer={openFormDrawer} setOpenFormDrawer={setOpenFormDrawer} />
    </Box>
  )
}

export default UserList
