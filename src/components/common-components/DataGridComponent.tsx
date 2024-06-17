import { HandleControls, LimitPerPageOptions, PageControls } from '@/types/common'
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid'

type Props = {
  columns: GridColDef[]
  rows: any[]
  pageControls: PageControls
  handleControls: HandleControls
}

const DataGridComponent = ({ columns, rows, pageControls, handleControls }: Props) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowCount={pageControls?.total}
      pageSizeOptions={LimitPerPageOptions}
      paginationModel={{
        pageSize: handleControls.limitPerPage,
        page: pageControls?.currentPage as number,
      }}
      onPaginationModelChange={(model: GridPaginationModel, details: GridCallbackDetails<any>) => {
        console.log(model)
        console.log(details)
      }}
      disableRowSelectionOnClick
      paginationMode='server'
    />
  )
}

export default DataGridComponent
