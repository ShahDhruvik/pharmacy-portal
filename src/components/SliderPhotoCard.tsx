import PhotoCard from './PhotoCard'

type arrType = {
  imgName: string
  name: string
}

type Props = {
  arr: arrType[]
}

const SliderPhotoCard = ({ arr }: Props) => {
  return (
    <div className='flex overflow-x-scroll gap-8 py-10 px-2  hideScroll'>
      {arr.map((x) => (
        <div className='flex '>
          <PhotoCard img={x.imgName} name={x.name} />
        </div>
      ))}
    </div>
  )
}

export default SliderPhotoCard
