import { HandleControls, LimitPerPageOptions, PageControls } from '@/types/common'
import { Box } from '@mui/material'
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid'

type Props = {
  columns: GridColDef[]
  rows: any[]
  pageControls: PageControls
  handleControls: HandleControls
}

const DataGridComponent = ({ columns, rows, pageControls, handleControls }: Props) => {
  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={pageControls?.total}
        pageSizeOptions={LimitPerPageOptions}
        paginationModel={{
          pageSize: handleControls.limitPerPage,
          page: pageControls?.currentPage as number,
        }}
        onPaginationModelChange={(
          model: GridPaginationModel,
          details: GridCallbackDetails<any>,
        ) => {
          console.log(model)
          console.log(details)
        }}
        disableRowSelectionOnClick
        paginationMode='server'
      />
    </Box>
  )
}

export default DataGridComponent
