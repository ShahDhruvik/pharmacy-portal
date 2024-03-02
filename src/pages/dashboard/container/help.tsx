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
        className='flex justify-center p-0 xl:items-center gap-10
    w-full min-h-screen'
      >
        {/* <div className='max-xl:hidden self-start mb-20 p-0 max-w-[300px] '>
        <img src={img1} alt='' className='w-full h-full ' />
      </div> */}
        <div className='flex-1 flex flex-col gap-5 p-0 px-16'>
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
            {filteredData.length > 0 && <p className='pl-2 text-start'>Browse help topics</p>}
            <AccordionBox faqs={filteredData ? filteredData : []} index={state?._id} />
          </div>
        </div>
        <div className='max-lg:hidden self-start mb-20 flex flex-col gap-5 max-w-[300px] p-12'>
          <div className='xl:hidden w-full'>
            <img src={img1} alt='' className='w-full h-full' />
          </div>
          <div className='w-full'>
            <img src={img1} alt='' className='w-full h-full' />
          </div>
        </div>
      </section>
    </>
  )
}

export default Help
