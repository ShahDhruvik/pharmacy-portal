// Individual entities are considered a whole new page. Page includes all the components  that invloveds the entity (ex: list,form, etc)
import { Box } from '@mui/material'

type Props = {}

const About = ({}: Props) => {
  return (
    <Box className='min-h-screen bg-red-400 flex justify-center items-center'>
      <h1 className='font-bold text-5xl'>ABOUT</h1>
    </Box>
  )
}

export default About
