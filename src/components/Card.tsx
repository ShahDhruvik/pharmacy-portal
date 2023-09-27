// All the common components are made placed and developed here

import { numberOfcards } from '../lib/Card'

type Props = {}

const Card = ({}: Props) => {
  const number = numberOfcards()
  return <h3 className='text-4xl '>{` ${number} Cards`}</h3>
}

export default Card
