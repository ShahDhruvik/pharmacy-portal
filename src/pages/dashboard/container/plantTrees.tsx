import img1 from '../../../assets/images/Aspect_Ratio.jpg'
import SvgIcon from '../../../components/SvgIcon'
import { PlantTree } from '../../../utils/data'

interface Props {}

const PlantTrees = ({}: Props) => {
  return (
    <>
      <section className='min-h-screen flex justify-center items-center'>
        <div>
          <div className='flex items-center py-2 flex-wrap gap-16'>
            <div className='flex-1'>
              <img src={img1} alt='' />
              {/* <h1 className='font-normal text-2xl text-center'>Start booking to plant trees!</h1> */}
            </div>
            <div className='flex-1'>
              <h2 className='font-normal text-2xl'>Did you know?</h2>
              <span className='text-sm font-light'>
                We plant 2 trees every time you book Oopchar
              </span>
              {PlantTree.map((x) => (
                <div className='flex my-7 gap-2' key={Math.random()}>
                  <div>
                    <SvgIcon iconName={x.icon as string} />
                  </div>
                  <div>
                    <h3 className='font-normal'>{x.que}</h3>
                    <span className='text-sm font-light'>{x.ans}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className='flex justify-end pr-10 pb-2'>
        <div>
          <SvgIcon iconName='ser' />
        </div>
      </section>
    </>
  )
}

export default PlantTrees
