import DataGridComponent from '@/components/common-components/DataGridComponent'
import TabComponent from '@/components/common-components/TabComponent'
import { HandleControls, PageControls, TabPropsType } from '@/types/common'
import { GridColDef } from '@mui/x-data-grid'

type Props = {}

const UserPage = (props: Props) => {
  const pageControls: PageControls = {
    currentPage: 1,
    from: 1,
    pages: 10,
    to: 10,
    total: 37,
    numberOfRecords: 100,
  }
  const handleControls: HandleControls = {
    currentPage: 1,
    limitPerPage: 10,
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
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Roxien', firstName: 'Harvey', age: 68 },
    { id: 11, lastName: 'Roxiem', firstName: 'Harvey', age: 66 },
    { id: 12, lastName: 'Roxiek', firstName: 'Harvey', age: 63 },
  ]
  const tabData: TabPropsType = {
    handleTabChange: (value: string) => {},
    tabList: [
      {
        tabElement: <div>Roles</div>,
        tabName: 'Roles',
        tabValue: '0',
      },
      {
        tabElement: (
          <DataGridComponent
            columns={columns}
            rows={rows}
            pageControls={pageControls}
            handleControls={handleControls}
          />
        ),
        tabName: 'Users',
        tabValue: '1',
      },
    ],
  }

  return <TabComponent tabProps={tabData} />
}

export default UserPage
