import SvgIcon from '../../../../components/SvgIcon'
import CustomDialog from '../../../../components/Dialog-custom'
import { Button, DialogContentText, DialogTitle, Divider } from '@mui/material'
import { useState } from 'react'
import { FormTypeArray } from '../../../../types/common'
import { theme } from '../../../../context/ThemeProvider'
import AuthArea from './authArea'
import AssistFAQ from './assistFAQ'
import AssistSlider from './assistSlider'
import AssistQNA from './assistQNA'
import img1 from '@/assets/images/Aspect_Ratio.jpg'
import CloseCard from './closeCard'
import { qNAList, useAssessment } from '@/context/AssessmentContext'
import { useNavigate } from 'react-router-dom'
import { CloseCardType } from '@/types/assessmentTypes'
import { ASSESST_AREA } from '@/utils/constants'

type Props = {
  handleClose: () => void
  open: boolean
}

// SignIn & Faq

//Question & slider

//Modal popUp on close

const Assessment = ({ handleClose, open }: Props) => {
  const { area, setArea, setQuestion, setAnswer } = useAssessment()
  const nav = useNavigate()

  const [signType, setSignType] = useState<FormTypeArray>([])
  const [openCloseModal, setOpenCloseModal] = useState(false)
  const closeCards: CloseCardType[] = [
    {
      id: 0,
      image: img1,
      btnTxt: 'Go back to assessment',
      btnBelowtxt: 'Continue from where you left',
      onClickFnc: () => {
        setOpenCloseModal(false)
      },
    },
    {
      id: 1,
      image: img1,
      btnTxt: 'Book an appoinment',
      btnBelowtxt: 'Skip the online assessment and talk to a professional',
      onClickFnc: () => {
        nav('/book-consultation')
      },
    },
  ]

  return (
    <>
      <CustomDialog
        open={open && !openCloseModal}
        handleClose={handleClose}
        maxHeight={510}
        maxWidth={'lg'}
        header={{
          isHeader: true,
          component: (
            <div>
              <DialogTitle
                sx={{
                  padding: 0,
                  mx: 5,
                  mt: 3,
                }}
              >
                <div className='flex   justify-between'>
                  <div>
                    <h1 className='leading-3'>Welcome to Virtual Assessment</h1>
                    <span className='text-sm text-blue-main'>Daisy: Your virtual health agent</span>
                  </div>
                  <button
                    onClick={() => {
                      if (area.includes(ASSESST_AREA.AUTH) && area.includes(ASSESST_AREA.FAQ)) {
                        handleClose()
                        setArea([ASSESST_AREA.AUTH, ASSESST_AREA.FAQ])
                        setSignType([])
                      } else {
                        setOpenCloseModal(true)
                      }
                    }}
                    className='self-start'
                  >
                    <SvgIcon iconName='cancel' svgProp={{ fill: theme.palette.mDarkGray?.main }} />
                  </button>
                </div>
              </DialogTitle>
              <Divider
                sx={{
                  border: `3px solid ${theme.palette.mMediumGray?.main}`,
                  mx: 5,
                  borderRadius: '8px',
                }}
              />
            </div>
          ),
        }}
        disableClickAway={true}
        action={{
          isAction: false,
          component: null,
        }}
      >
        <DialogContentText
          sx={{
            mx: 2,
            display: 'flex',
          }}
        >
          <div>
            {area.includes(ASSESST_AREA.AUTH) && (
              <AuthArea handleClose={handleClose} setSignType={setSignType} signType={signType} />
            )}
            {area.includes(ASSESST_AREA.QNA) && <AssistQNA />}
          </div>

          <div className='relative flex'>
            <div>
              <Divider
                orientation='vertical'
                sx={{
                  border: `3px solid ${theme.palette.mMediumGray?.main}`,
                  borderRadius: '8px',
                  mx: 4,
                  position: 'sticky',
                  top: 0,
                  height: 460,
                }}
              />
            </div>
            {area.includes(ASSESST_AREA.FAQ) && <AssistFAQ />}
            {area.includes(ASSESST_AREA.SLIDER) && <AssistSlider />}
          </div>
        </DialogContentText>
      </CustomDialog>
      <CustomDialog
        open={openCloseModal}
        handleClose={handleClose}
        maxHeight={510}
        maxWidth={'lg'}
        header={{
          isHeader: true,
          component: (
            <DialogTitle>
              <div className='flex items-center justify-end gap-2'>
                <h1 className='leading-3'>To speak to an advisor for free</h1>
                <Button
                  color='mOrange'
                  sx={{
                    borderTopRightRadius: '20px',
                    borderTopLeftRadius: '20px',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px',
                    px: 2,
                    py: 0,
                    minWidth: 'max-content',
                    textTransform: 'uppercase',
                    boxShadow: `0px 6px 2px ${theme.palette.mDarkBlue?.main}`,
                    ':hover': {
                      boxShadow: `0px 6px 2px ${theme.palette.mDarkBlue?.main}`,
                    },
                  }}
                >
                  Call today
                </Button>
                <span className=' font-bold text-darkBlue-main'>90000 00000</span>
              </div>
            </DialogTitle>
          ),
        }}
        action={{
          isAction: false,
          component: null,
        }}
        paddingOfContent='0px'
        minWidth={900}
      >
        <DialogContentText>
          <div className='bg-green-main w-full py-2 flex justify-between px-5'>
            <p>Did you know that assessment is completely FREE?</p>
            <button
              onClick={() => {
                setOpenCloseModal(false)
                handleClose()
                setArea([ASSESST_AREA.AUTH, ASSESST_AREA.FAQ])
                setQuestion(qNAList[0])
                setAnswer([])
                setSignType([])
              }}
            >
              <SvgIcon iconName='cancel' svgProp={{ fill: theme.palette.mWhite?.main }} />
            </button>
          </div>
          <div className='px-6 py-4 flex items-center justify-center gap-14'>
            {closeCards.map((x) => {
              return <CloseCard cardProps={x} key={x.id} />
            })}
          </div>
        </DialogContentText>
      </CustomDialog>
    </>
  )
}

export default Assessment
