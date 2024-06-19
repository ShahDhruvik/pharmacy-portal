import { EnumValues, HandleControls, LoadingContextType, PageControls } from '@/types/common'
import { LimitPerPageOptions, Tables } from '@/utils/constants'
import { Box, CircularProgress, TablePaginationProps } from '@mui/material'
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridPagination,
  GridPaginationModel,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import MuiPagination from '@mui/material/Pagination'
import TableFooterControls from './TableFooterControls'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
type Props = {
  columns: GridColDef[]
  rows: any[]
  pageControls: PageControls
  handleControls: HandleControls
  setHandleControls: Dispatch<SetStateAction<HandleControls>>
  loading: LoadingContextType['loading']
  tableName: EnumValues<typeof Tables>
}
function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
  const apiRef = useGridApiContext()
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <MuiPagination
      color='primary'
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1)
      }}
    />
  )
}

function CustomPagination(props: {
  handleControls: HandleControls
  setHandleControls: Dispatch<SetStateAction<HandleControls>>
}) {
  return <GridPagination ActionsComponent={Pagination} />
}
const DataGridComponent = ({
  columns,
  rows,
  pageControls,
  handleControls,
  loading,
  tableName,
  setHandleControls,
}: Props) => {
  const handlePage = (newPage: number) =>
    setHandleControls({ ...handleControls, currentPage: newPage })
  const handleRowsPerPage = (pageLimit: number) =>
    setHandleControls({
      ...handleControls,
      limitPerPage: pageLimit,
      currentPage: 1,
    })

  const loadingCondition = loading?.isLoading && loading?.loadingProps?.table === tableName
  return (
    <div {...(loadingCondition && { style: { height: 200, width: '100%' } })}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        loading={loadingCondition}
        slots={{
          pagination(props, deprecatedLegacyContext) {
            return (
              <TableFooterControls
                currentPage={pageControls?.currentPage as number}
                from={pageControls?.from as number}
                handleControls={handleControls}
                handlePage={handlePage}
                handleRowsPerPage={handleRowsPerPage}
                notFound={false}
                numberOfPages={pageControls?.pages as number}
                to={pageControls?.to as number}
                total={pageControls?.total as number}
              />
            )
          },
          loadingOverlay(props, deprecatedLegacyContext) {
            return (
              <div className='flex flex-col gap-2 items-center justify-center w-full h-full'>
                <CircularProgress color='mPink' size={30} />
                <p className='font-semibold text-mPink-main'>{COMMON_MESSAGE.loadingMessage}</p>
              </div>
            )
          },
        }}
        localeText={{ noRowsLabel: 'There is nothing to show here.' }}
      />
    </div>
  )
}

export default DataGridComponent
