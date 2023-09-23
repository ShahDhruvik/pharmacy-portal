type Props = {
  img: string
  name: string
}

const PhotoCard = ({ img, name }: Props) => {
  return (
    <div className='relative w-60'>
      <img src={img} alt={img} className='aspect-video w-96 rounded-2xl' />
      <div className='absolute bottom-0 text-white bg-black w-60 rounded-b-2xl flex justify-center bg-opacity-50'>
        <h1>{name}</h1>
      </div>
    </div>
  )
}

export default PhotoCard
