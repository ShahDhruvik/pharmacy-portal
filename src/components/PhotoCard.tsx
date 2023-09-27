type Props = {
  img: string
  name: string
}

const PhotoCard = ({ img, name }: Props) => {
  return (
    <div className='relative w-80'>
      <img src={img} alt={img} className='aspect-video rounded-2xl' />
      <div className='absolute bottom-0 text-white-main bg-black-main w-80 rounded-b-2xl flex justify-center bg-opacity-50'>
        <h1>{name}</h1>
      </div>
    </div>
  )
}

export default PhotoCard
