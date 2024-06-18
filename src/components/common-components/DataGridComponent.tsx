import {
  EnumValues,
  HandleControls,
  LimitPerPageOptions,
  LoadingContextType,
  PageControls,
} from '@/types/common'
import { Tables } from '@/utils/constants'
import { Box } from '@mui/material'
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid'

type Props = {
  columns: GridColDef[]
  rows: any[]
  pageControls: PageControls
  handleControls: HandleControls
  loading: LoadingContextType['loading']
  tableName: EnumValues<typeof Tables>
}

const DataGridComponent = ({
  columns,
  rows,
  pageControls,
  handleControls,
  loading,
  tableName,
}: Props) => {
  console.log(pageControls)
  return (
    <div style={{ height: 300, width: '100%' }}>
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
        sortingMode='server'
        filterMode='server'
        paginationMode='server'
        loading={loading?.isLoading && loading?.loadingProps?.table === tableName}
        localeText={{ noRowsLabel: 'There is nothing to show here.' }}
      />
    </div>
  )
}

export default DataGridComponent
