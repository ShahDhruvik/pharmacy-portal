import { Box } from '@mui/material'
type Props = {
  children: any
}

const DashBoardLayout = ({ children }: Props) => {
  return (
    <section>
      <div>header</div>
      {children}
    </section>
  )
}

export default DashBoardLayout
