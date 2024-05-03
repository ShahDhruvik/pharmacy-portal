import img1 from '../../../../src/assets/images/Aspect_Ratio.jpg'
// import { faqs } from '../../../utils/data'
import AccordionBox from '../../../components/AccordionBox'
import { useLoading } from '@/context/LoadingContext'
import { useToast } from '@/hooks/useToast'
import { useEffect, useRef, useState } from 'react'
import { getAllFaqs } from '@/lib/Faq'
import { Search, SearchIconWrapper, StyledInputBase } from '@/components/MuiStyledComponents'
import Ser from '@/assets/icons/ser.svg?react'
import { debounce } from 'lodash'
import { theme } from '@/context/ThemeProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import { useAuth } from '@/context/AuthContext'
import VideoPlayer from '@/components/VideoPlayer'

interface Props {}

const Help = ({}: Props) => {
  const { state } = useLocation()
  const { setLoading } = useLoading()
  const showToast = useToast()
  const [data, setData] = useState<any>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const getData = async () => {
    const res = await getAllFaqs(setLoading, showToast)
    if (res) {
      setData(res)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSearch = debounce((term: string) => {
    setSearchTerm(term)
  }, 300)

  const filteredData = data?.filter((faq: any) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const { authParams } = useAuth()

  return (
    <>
      {authParams?.isAuth && <Header />}
      <section
        className='flex justify-center p-0 gap-10
        w-full min-h-screen mt-5'
      >
        <div className='flex w-full gap-10'>
          <div className='min-w-3/5 w-full flex flex-col'>
            <div className=' w-full flex flex-col  lg:items-center'>
              <h1 className='text-xl mxs:text-2xl msm:text-3xl text-center block pb-5'>
                How can we help you?
              </h1>
              <div className='min-w-full'>
                <Search
                  sx={{
                    backgroundColor: theme.palette.mLightGray?.main,
                    borderRadius: '8px',
                  }}
                >
                  <SearchIconWrapper type='submit' sx={{ zIndex: 10 }}>
                    <Ser />
                  </SearchIconWrapper>
                  <StyledInputBase
                    // disabled={loading}
                    placeholder='Describe your issue'
                    // inputRef={searchRef}
                    // onChange={handleChange}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </Search>
              </div>
            </div>
            <div>
              {filteredData.length > 0 && (
                <p className='pl-2 text-start mt-2 mb-1'>Browse help topics</p>
              )}
              <AccordionBox faqs={filteredData ? filteredData : []} index={state?._id} />
            </div>
          </div>
          <div className='w-2/5 max-lg:hidden self-start mb-20 flex flex-col gap-5 max-w-[300px] min-w-[300px] p-0'>
            <div className='flex-1 w-full aspect-video '>
              <VideoPlayer
                style={{ width: '100%', height: '100%' }}
                videoUrl='https://www.youtube.com/watch?v=jt_dHJNQqX8&list=PLYcj0BpCoCc7t8F7BuuUhVtQRXU9EssvV&index=1'
              />
            </div>
            <div className='flex-1 w-full aspect-video '>
              <VideoPlayer
                style={{ width: '100%', height: '100%' }}
                videoUrl='https://www.youtube.com/watch?v=dw6qSD8AaxQ&list=PLYcj0BpCoCc7t8F7BuuUhVtQRXU9EssvV&index=2'
              />
            </div>
            <div className='flex-1 w-full aspect-video '>
              <VideoPlayer
                style={{ width: '100%', height: '100%' }}
                videoUrl='https://www.youtube.com/watch?v=hN_InEusu9k&list=PLYcj0BpCoCc7t8F7BuuUhVtQRXU9EssvV&index=3'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Help
