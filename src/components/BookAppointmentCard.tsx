/* eslint-disable react-refresh/only-export-components */
import { theme } from '@/context/ThemeProvider'
import { Button, Divider } from '@mui/material'
import img1 from '@/assets/images/Aspect_Ratio.jpg'
import TotalAvatars from './Avatar'
import GoogleIcon from '@mui/icons-material/Google'

type Props = {
  img: string
  name: string
  address: string
  rating: number
  drName?: string
  setPractice?: (item: string) => void
  details?: boolean
  designation?: string
}

export const imgArr = [
  {
    imgName: img1,
  },
  {
    imgName: img1,
  },
  {
    imgName: img1,
  },
  {
    imgName: img1,
  },
]

const BookAppointmentCard = ({
  img,
  name,
  address,
  rating,
  drName,
  setPractice,
  details,
  designation,
}: Props) => {
  const handlePractice = (item: string) => {
    if (setPractice) {
      setPractice(item)
    }
  }

  return (
    <>
      <div className='flex justify-between min-w-xs py-5'>
        <div
          className={
            details
              ? 'flex gap-10 items-center justify-center'
              : 'flex gap-10 items-start justify-center'
          }
        >
          <div className='flex flex-col items-center'>
            <img
              src={img}
              className={details ? 'aspect-square w-32' : 'rounded-full w-24 aspect-square'}
            />
            {!details && (
              <button
                className='text-darkBlue-main text-sm'
                onClick={() => {
                  if (drName) {
                    handlePractice('Provider')
                  } else {
                    handlePractice('Practice')
                  }
                }}
              >
                View profile
              </button>
            )}
          </div>
          <div className='w-80'>
            {drName && <h4 className='text-darkBlue-main text-lg font-light'>{drName}</h4>}
            {designation && (
              <h4 className='text-darkBlue-main text-sm font-light'>{designation}</h4>
            )}
            {drName ? (
              <h5 className='text-black-main text-sm font-light'>{name}</h5>
            ) : (
              <h5 className='text-darkBlue-main text-lg font-light'>{name}</h5>
            )}
            <span className='text-darkGray-main text-base font-light'>{address}</span>
            {!drName && (
              <div>
                <div className='flex items-center gap-2'>
                  <div>
                    <GoogleIcon
                      sx={{
                        color: theme.palette.mBlack?.main,
                        fontSize: 30,
                      }}
                    />
                  </div>
                  <div>
                    <h6 className='text-black-main text-xs font-light'>Google Reviews</h6>
                    <span className='text-black-main text-sm font-light'>{rating}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {!details && (
          <div className='flex flex-col items-center'>
            <div className='flex items-center justify-center pb-3'>
              <TotalAvatars img={imgArr} />
            </div>
            <Button variant='contained' color='mPink'>
              Book Appointment
            </Button>
          </div>
        )}
      </div>
      {!details && (
        <Divider
          sx={{ border: '3px solid', color: `${theme.palette.mWhite?.main}`, marginBottom: '4px' }}
        />
      )}
    </>
  )
}

export default BookAppointmentCard
