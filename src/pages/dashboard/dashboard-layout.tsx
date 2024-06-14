import Header from '@/components/common-components/Header'
import { Box } from '@mui/material'
type Props = {
  children: any
}

const DashBoardLayout = ({ children }: Props) => {
  return (
    <section className='min-h-screen'>
      <Header />
      <div className='p-container mt-12 sm:mt-16 '>{children}</div>
    </section>
  )
}

export default DashBoardLayout
