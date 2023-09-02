import { numberOfcards } from '../lib/Card'

type Props = {}

const Card = ({}: Props) => {
  const number = numberOfcards()
  return <div>{`${number} Cards`}</div>
}

export default Card
