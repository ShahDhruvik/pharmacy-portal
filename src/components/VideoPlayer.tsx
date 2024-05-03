import React, { CSSProperties } from 'react'
import ReactPlayer from 'react-player'

type Props = {
  videoUrl?: string
  height?: number
  width?: number
  style?: CSSProperties
}

const VideoPlayer = ({ videoUrl, height, width, style }: Props) => {
  return (
    <div style={{ position: 'relative', ...style }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <ReactPlayer
          url={videoUrl ?? 'https://youtu.be/BHACKCNDMW8?si=sSiHdm3luc_9SfLN'}
          //   playing={true}
          width='100%'
          height='100%'
        />
      </div>
    </div>
  )
}

export default VideoPlayer
