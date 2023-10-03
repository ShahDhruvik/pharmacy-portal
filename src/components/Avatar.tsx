import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'

type imgType = {
  imgName: string
}

type Props = {
  img: imgType[]
  count?: number
}

const TotalAvatars = ({ img, count }: Props) => {
  return (
    <AvatarGroup total={count ?? 0}>
      {img.map((x) => (
        <Avatar
          alt='Remy Sharp'
          src={x.imgName}
          sx={{
            width: '65px',
            height: '65px',
          }}
        />
      ))}
    </AvatarGroup>
  )
}

export default TotalAvatars
