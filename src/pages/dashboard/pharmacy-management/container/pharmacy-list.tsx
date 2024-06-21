import DataGridComponent from '@/components/common-components/DataGridComponent'
import { HandleControls, PageControls } from '@/types/common'
import { LoadingButton } from '@mui/lab'
import { Alert, Avatar, Box, Button, CircularProgress, IconButton, Switch } from '@mui/material'
import { GridColDef, useGridApiRef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
// import { deletePharmacy, getPharmacys, inactivePharmacy } from '@/lib/pharmacy'
import { useLoading } from '@/context/LoadingContext'
// import { Pharmacy, PharmacyFormFields } from '@/types/pharmacy.types'
import { CONST_APP_IMAGE_URL, Tables, limitPerPage } from '@/utils/constants'
import { VITE_APP_IMAGE_URL } from '@/utils/envVariables'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ConfirmationPopUp from '@/components/common-components/confirm-popup'
import { useAskConfirmation } from '@/context/ConfirmContext'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { Role } from '@/types/role.types'
import { dropdownRoles } from '@/lib/role'
import PharmacyForm from './pharmacy-form'
import CardContainer from '@/components/common-components/CardContainer'
import { getPharmacys, inactivePharmacy } from '@/lib/pharmacy'
import { Pharmacy } from '@/types/pharmacy-types'

type Props = {}

const PharmacyList = (props: Props) => {
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
    numberOfRecords: 0,
  }
  const { setAskConfirmation } = useAskConfirmation()
  const { setLoading, loading } = useLoading()
  const [openFormDrawer, setOpenFormDrawer] = useState<boolean>(false)
  const [dataNotFound, setDataNotFound] = useState<boolean>(false)
  const [handleControls, setHandleControls] = useState<HandleControls>(defaultHandleControls)
  const [pageControls, setPageControls] = useState<PageControls>(defaultPageControls)
  const [data, setData] = useState<Pharmacy[]>([])
  const fetchPharmacys = async () => {
    setLoading({ isLoading: true, loadingProps: { table: Tables?.Pharmacy } })
    const res = await getPharmacys(handleControls)
    if (res) {
      const { records, ...rest } = res
      const allData = [...data, ...res.records]
      const allDataLength = allData.length
      setDataNotFound(allData.length === 0)
      setData(allData as any[])
      setPageControls({ ...rest, numberOfRecords: allDataLength })
    }
    setLoading({ isLoading: false })
  }
  useEffect(() => {
    fetchPharmacys()
  }, [handleControls])
  const handleReFetch = () => {
    setData([])
    setHandleControls(defaultHandleControls)
  }
  return (
    <Box>
      <Alert className='mb-3' severity='info'>
        By configuring Pharmacys effectively, you can ensure that Pharmacys have the appropriate
        level of access
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
      <CardContainer
        handleControls={handleControls}
        setHandleControls={setHandleControls}
        pageControls={pageControls}
      >
        {loading?.isLoading && loading?.loadingProps?.table === Tables?.Pharmacy ? (
          <div className='flex items-center flex-1  text-mPink-main font-medium justify-center'>
            <CircularProgress color='mPink' size={15} thickness={5} />
            <p>{COMMON_MESSAGE.loadingMessage}</p>
          </div>
        ) : dataNotFound ? (
          <div className='flex items-center flex-1  text-mPink-main font-medium justify-center'>
            <p>{COMMON_MESSAGE.Nothing}</p>
          </div>
        ) : (
          data?.map((phr) => {
            return (
              <div className='bg-mLightWhite-main shadow-cardShadow min-w-[450px] aspect-video  relative p-container'>
                <div className='absolute top-0 right-0'>
                  <Switch
                    checked={phr?.isActive}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                      setAskConfirmation({
                        isConfirmation: true,
                        confirmProps: {
                          confirmationText: phr?.isActive
                            ? COMMON_MESSAGE.InActiveConfirmation
                            : COMMON_MESSAGE.ActiveConfirmation,
                          handleCancel: () => {
                            setAskConfirmation({ confirmProps: undefined, isConfirmation: false })
                          },
                          handleConfirm: async () => {
                            setLoading({ isLoading: true, loadingProps: { btnLoading: true } })
                            const res = await inactivePharmacy(phr?.internalId, phr?.isActive)
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
                <div className='absolute bottom-2 right-2'>
                  <LoadingButton
                    variant='text'
                    color='mPink'
                    sx={{ fontSize: '14px', textTransform: 'uppercase' }}
                  >
                    Download Data
                  </LoadingButton>
                </div>
                <div>
                  <div className='w-20 aspect-video'>
                    <img
                      src={
                        (VITE_APP_IMAGE_URL || CONST_APP_IMAGE_URL) + phr?.sqLogo ??
                        '/default-image.png'
                      }
                    />
                  </div>
                  <p>{phr?.name}</p>
                  <p>{phr?.mode}</p>
                  <p>{phr?.type}</p>
                </div>
              </div>
            )
          })
        )}
      </CardContainer>
      <PharmacyForm openFormDrawer={openFormDrawer} setOpenFormDrawer={setOpenFormDrawer} />
      <ConfirmationPopUp />
    </Box>
  )
}

export default PharmacyList
